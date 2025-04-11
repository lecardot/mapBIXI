class TextTools {

    static extractNameStation(name) {
        // remove ()
        var commaIndex=name.indexOf('(')
        if (commaIndex == -1) {
            return name;
        }
        return name.substring(0,commaIndex);
    }
}

export default TextTools;