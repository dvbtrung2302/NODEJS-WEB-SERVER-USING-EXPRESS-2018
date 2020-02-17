var input = document.getElementById('input');

input.addEventListener('change', function() {
	sessionStorage.setItem('draft', input.value);
});
input.value = sessionStorage.getItem('draft');