export function basename(path: string, ext: string): string {
    const validExt = ext[0] === '.' ? ext : '.' + ext
    const rx = new RegExp(`(.*\/)(?:(.*)(${validExt})|(.*))`, "g")
    const arr = rx.exec(path)
    const prefix = arr == null ? "" : arr![1]
    if (path.slice(path.length - validExt.length, path.length) === validExt) {
        return path.slice(prefix.length, path.length - validExt.length)
    }
    return path.slice(prefix.length, path.length)
}
//console.log(basename("test/path/stuff/foo.test", ".test"))
//console.log(basename("test/path/stuff/foo.test", ".tmj"))
//console.log(basename("test/path/stuff/foo.tmj", ".tmj"))
//console.log(basename("test/path/stuff/fooatmj.tmj", ".tmj"))
//console.log(basename("test/path/stuff/foo.tmj", "tmj"))
//console.log(basename("foo.tmj", "tmj"))
//console.log(basename("foo", "tmj"))
//console.log(basename("foo", ".tmj"))
//console.log(basename("foo", ""))
//console.log(basename("foo.tmj", ""))

export function join(baseStr: string, addStr: string): string {
    if (baseStr[baseStr.length - 1] !== '/') {
        baseStr = baseStr + '/'
    }
    return baseStr + addStr
}
//console.log(join("foo/bar/","baz.tmj"))
//console.log(join("foo/bar","baz.tmj"))
//console.log(join("foo/bar","faz/baz.tmj"))
//console.log(join("foo/bar","faz/baz"))
