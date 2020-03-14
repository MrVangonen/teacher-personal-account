const FileFormats = [
    {
        extensions: ["pdf"],
        src: "pdf.png"
    },
    {
        extensions: ["doc", "docx"],
        src: "doc.png"
    },
    {
        extensions: ["ppt"],
        src: "ppt.png"
    },
    {
        extensions: ["txt"],
        src: "txt.png"
    },
    {
        extensions: ["xlsx"],
        src: "xlsx.png"
    },
    {
        extensions: ["zip", "rar"],
        src: "zip.png"
    },
    {
        extensions: ["svg", "gif", "png", "jpg"],
        src: "image.svg"
    }
];

Object.freeze(FileFormats);

export default FileFormats;
