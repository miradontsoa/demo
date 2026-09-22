window.addEventListener('load', function () {
	// Add required icon after required input
	var requiredInputElements = document.querySelectorAll('input[required], textarea[required]');
	requiredInputElements.forEach(function (requiredElement, index) {
		let after = document.createElement('div');
		after.classList.add('input-alert');
		after.innerHTML = '!';
		after.style.position = `absolute`;
		after.style.top = `0.5rem`;
		after.style.right = `0.5rem`;
		// requiredElement.after(after)

		let inputWrapper = document.createElement('div');
		inputWrapper.classList.add('input-wrapper');
		inputWrapper.style.position = `relative`;
		requiredElement.before(inputWrapper)
		inputWrapper.appendChild(requiredElement)
		inputWrapper.appendChild(after)
	});
});