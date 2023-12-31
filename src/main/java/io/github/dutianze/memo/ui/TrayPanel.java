package io.github.dutianze.memo.ui;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.*;
import java.nio.charset.StandardCharsets;
import java.util.Enumeration;
import java.util.Objects;

/**
 * @author dutianze
 * @date 2022/10/3
 */
@Slf4j
@Component
public class TrayPanel {

    private JFileChooser fc;

    public TrayPanel() throws IOException {
        //Check the SystemTray is supported
        if (!SystemTray.isSupported()) {
            log.info("SystemTray is not supported");
            return;
        }

        final PopupMenu popup = new PopupMenu();
        BufferedImage trayIconImage =
                ImageIO.read(Objects.requireNonNull(TrayPanel.class.getResource("/image/edit.png")));
        int trayIconWidth = new TrayIcon(trayIconImage).getSize().width;
        TrayIcon trayIcon = new TrayIcon(trayIconImage.getScaledInstance(trayIconWidth, -1, Image.SCALE_SMOOTH));
        final SystemTray tray = SystemTray.getSystemTray();

        MenuItem openItem = new MenuItem("open");
        MenuItem phoneItem = new MenuItem("open from mobile");
        MenuItem openFile = new MenuItem("open file");
        MenuItem exitItem = new MenuItem("exit");

        //Add components to pop-up menu
        popup.add(openItem);
        popup.addSeparator();
        popup.add(phoneItem);
        popup.addSeparator();
        popup.add(openFile);
        popup.addSeparator();
        popup.add(exitItem);
        trayIcon.setPopupMenu(popup);

        try {
            tray.add(trayIcon);
        } catch (AWTException e) {
            log.info("TrayIcon could not be added.");
        }

        trayIcon.addActionListener(e -> JOptionPane.showMessageDialog(null,
                                                                      "This dialog box is run from System Tray"));

        openItem.addActionListener(e -> {
            try {
                Desktop.getDesktop().browse(new URL("http://localhost:12190").toURI());
            } catch (Exception ex) {
                log.error("Failed openWebpage");
            }
        });

        phoneItem.addActionListener(e -> {
            try {
                String hostAddress = getLocalHostLANAddress().getHostAddress();
                BitMatrix matrix = new MultiFormatWriter().encode(
                        "http://" + hostAddress + ":12190",
                        BarcodeFormat.QR_CODE, 200, 200);
                BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(matrix);

                JDialog dialog = new JDialog();
                dialog.setDefaultCloseOperation(JDialog.DISPOSE_ON_CLOSE);
                dialog.setTitle("手机扫描二维码");
                dialog.add(new JLabel(new ImageIcon(bufferedImage)));
                dialog.pack();
                dialog.setSize(200, 200);
                dialog.setLocationRelativeTo(null);
                dialog.setLocationByPlatform(true);
                dialog.setVisible(true);
            } catch (UnknownHostException | WriterException ex) {
                throw new RuntimeException(ex);
            }
        });
        openFile.addActionListener(e -> {
            if (fc == null) {
                fc = new JFileChooser();
                fc.setAcceptAllFileFilterUsed(true);
            }

            int returnVal = fc.showDialog(null, "生成url");
            if (returnVal == JFileChooser.APPROVE_OPTION) {
                File file = fc.getSelectedFile();
                StringSelection stringSelection = new StringSelection(
                        String.format("/api/video?filepath=%s", URLEncoder.encode(
                                file.getAbsolutePath(), StandardCharsets.UTF_8)));
                Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
                clipboard.setContents(stringSelection, null);
            }
            fc.setSelectedFile(null);
        });
        exitItem.addActionListener(e -> {
            tray.remove(trayIcon);
            System.exit(0);
        });
    }


    /**
     * Returns an <code>InetAddress</code> object encapsulating what is most likely the machine's LAN IP address.
     * <p/>
     * This method is intended for use as a replacement of JDK method <code>InetAddress.getLocalHost</code>, because
     * that method is ambiguous on Linux systems. Linux systems enumerate the loopback network interface the same
     * way as regular LAN network interfaces, but the JDK <code>InetAddress.getLocalHost</code> method does not
     * specify the algorithm used to select the address returned under such circumstances, and will often return the
     * loopback address, which is not valid for network communication. Details
     * <a href="http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4665037">here</a>.
     * <p/>
     * This method will scan all IP addresses on all network interfaces on the host machine to determine the IP address
     * most likely to be the machine's LAN address. If the machine has multiple IP addresses, this method will prefer
     * a site-local IP address (e.g. 192.168.x.x or 10.10.x.x, usually IPv4) if the machine has one (and will return the
     * first site-local address if the machine has more than one), but if the machine does not hold a site-local
     * address, this method will return simply the first non-loopback address found (IPv4 or IPv6).
     * <p/>
     * If this method cannot find a non-loopback address using this selection algorithm, it will fall back to
     * calling and returning the result of JDK method <code>InetAddress.getLocalHost</code>.
     * <p/>
     *
     * @throws UnknownHostException If the LAN address of the machine cannot be found.
     */
    private static InetAddress getLocalHostLANAddress() throws UnknownHostException {
        try {
            InetAddress candidateAddress = null;
            // Iterate all NICs (network interface cards)...
            for (Enumeration<NetworkInterface> ifaces = NetworkInterface.getNetworkInterfaces();
                 ifaces.hasMoreElements(); ) {
                NetworkInterface iface = ifaces.nextElement();
                // Iterate all IP addresses assigned to each card...
                for (Enumeration<InetAddress> inetAddrs = iface.getInetAddresses(); inetAddrs.hasMoreElements(); ) {
                    InetAddress inetAddr = inetAddrs.nextElement();
                    if (!inetAddr.isLoopbackAddress()) {

                        if (inetAddr.isSiteLocalAddress()) {
                            // Found non-loopback site-local address. Return it immediately...
                            return inetAddr;
                        } else if (candidateAddress == null) {
                            // Found non-loopback address, but not necessarily site-local.
                            // Store it as a candidate to be returned if site-local address is not subsequently found...
                            candidateAddress = inetAddr;
                            // Note that we don't repeatedly assign non-loopback non-site-local addresses as candidates,
                            // only the first. For subsequent iterations, candidate will be non-null.
                        }
                    }
                }
            }
            if (candidateAddress != null) {
                // We did not find a site-local address, but we found some other non-loopback address.
                // Server might have a non-site-local address assigned to its NIC (or it might be running
                // IPv6 which deprecates the "site-local" concept).
                // Return this non-loopback candidate address...
                return candidateAddress;
            }
            // At this point, we did not find a non-loopback address.
            // Fall back to returning whatever InetAddress.getLocalHost() returns...
            InetAddress jdkSuppliedAddress = InetAddress.getLocalHost();
            if (jdkSuppliedAddress == null) {
                throw new UnknownHostException("The JDK InetAddress.getLocalHost() method unexpectedly returned null.");
            }
            return jdkSuppliedAddress;
        } catch (Exception e) {
            UnknownHostException unknownHostException =
                    new UnknownHostException("Failed to determine LAN address: " + e);
            unknownHostException.initCause(e);
            throw unknownHostException;
        }
    }
}
