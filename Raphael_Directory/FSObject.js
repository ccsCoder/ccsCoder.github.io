/**
	Class to represent a file system object which can be either a file/folder/symlink.
*/
function FSObject(name,isDir) {
	this._name = name;
	this._isDir=isDir;
};

FSObject.prototype.getName = function() {
	return this._name;
};

FSObject.prototype.isDirectory = function() {
	return this._isDir;
}