package io.github.dutianze.memo;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.swing.*;
import java.awt.*;
import java.net.URL;
import java.util.Objects;

/**
 * @author dutianze
 * @date 2022/10/3
 */
@Slf4j
@Component
public class TrayPanel {

  public TrayPanel() {
    //Check the SystemTray is supported
    if (!SystemTray.isSupported()) {
      log.info("SystemTray is not supported");
      return;
    }

    final PopupMenu popup = new PopupMenu();
    final TrayIcon trayIcon =
        new TrayIcon(Objects.requireNonNull(createImage()));
    final SystemTray tray = SystemTray.getSystemTray();

    // Create a pop-up menu components
    MenuItem openFile = new MenuItem("打开应用");
    MenuItem exitItem = new MenuItem("退出");

    //Add components to pop-up menu
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

    openFile.addActionListener(e -> {
      try {
        Desktop.getDesktop().browse(new URL("http://localhost:12190").toURI());
      } catch (Exception ex) {
        log.error("Failed openWebpage");
      }
    });
    exitItem.addActionListener(e -> {
      tray.remove(trayIcon);
      System.exit(0);
    });
  }

  protected static Image createImage() {
    URL imageURL = TrayPanel.class.getResource("/image/bulb.gif");

    if (imageURL == null) {
      System.err.println("Resource not found: " + "/image/bulb.gif");
      return null;
    } else {
      return (new ImageIcon(imageURL, "tray icon")).getImage();
    }
  }
}
