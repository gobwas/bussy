exports.isFunction = function(obj) {
	return Object.prototype.toString.call(obj) == '[object Function]';
};

exports.forEachIn = function(obj, iterator) {
	Object.keys().forEach(function(key) {
		iterator.call(null, obj[key], key, obj);
	});
};

exports.find = function(list, obj) {
	var i, item, itemKeys, len, passed, found,
		keys, keysLen, k, key;

	i = 0;
	len = list.length;
	keys = Object.keys(obj);
	keysLen = keys.length;

	for (i = 0; i < len; i++) {
		passed = true;
		item = list[i];
		itemKeys = Object.keys(item);

		for (k = 0; k < keysLen; k++) {
			key = keys[k];
			if (itemKeys.indexOf(key) == -1) {
				passed = false;
				break;
			}

			if (item[key] !== obj[key]) {
				passed = false;
				break;
			}
		}

		if (passed) {
			found = item;
			break;
		}
	}

	return found;
};	