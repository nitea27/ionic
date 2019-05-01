export let isCordovaAvailable = (silent: boolean = false) => {
	if (!(<any>window).cordova) {
		if (!silent) {
			alert('This is a native feature. Please use a device');
		}
		return false;
	}
	return true;
};