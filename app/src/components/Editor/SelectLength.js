export class SelectLength {
    constructor(quill) {
        this.quill = quill;
        quill.on("text-change", this.update.bind(this));
        this.update();
    }

    update() {
        const lines = this.quill.getLines();
        let totalLength = 0;
        for (let i = 0; i < lines.length; i++) {
            const height = lines[i].domNode.offsetHeight;
            totalLength += height;
        }
        this.quill.root.totalLength = totalLength;
    }
}
