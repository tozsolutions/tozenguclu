(function(){
	var yearEl=document.getElementById('year');
	if(yearEl){yearEl.textContent=String(new Date().getFullYear());}
	var form=document.getElementById('contact-form');
	if(form){
		form.addEventListener('submit',function(ev){
			ev.preventDefault();
			var status=document.getElementById('form-status');
			if(!form.checkValidity()){
				status.textContent='Lütfen gerekli alanları doldurun.';
				return;
			}
			status.textContent='Gönderildi (demo).';
		});
	}
	var toggle=document.querySelector('.menu-toggle');
	var menu=document.getElementById('primary-menu');
	if(toggle && menu){
		toggle.addEventListener('click',function(){
			var expanded=toggle.getAttribute('aria-expanded')==='true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			menu.classList.toggle('show');
		});
	}
})();
