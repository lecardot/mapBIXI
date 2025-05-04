class TextTools {

    static extractNameStation(name, size) {

        if (name.length > size) {
            if (name.includes("(")) {
                name = name.slice(0, name.lastIndexOf('('))
                name = TextTools.extractNameStation(name, size)
            } else {
                name = name.substring(0, size-3) + '...';
            }
        }
        return name[0].toUpperCase() + name.slice(1);
    }
}

export default TextTools;