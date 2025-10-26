// Simple interactions: copy-to-clipboard and filter commands
document.addEventListener('DOMContentLoaded', function(){
  const copyButtons = document.querySelectorAll('.btn.copy');
  copyButtons.forEach(btn=>{
    btn.addEventListener('click', async (e)=>{
      const cmd = btn.getAttribute('data-cmd');
      try{
        await navigator.clipboard.writeText(cmd);
        btn.textContent = 'Copied!';
        setTimeout(()=> btn.textContent = 'Copy', 1400);
      }catch(err){
        // Fallback: select and prompt
        const ta = document.createElement('textarea');
        ta.value = cmd; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); btn.textContent='Copied!'; setTimeout(()=>btn.textContent='Copy',1400);}catch(e){ alert('Copy failed; command: ' + cmd);} 
        ta.remove();
      }
    });
  });

  // Filter commands by text
  const search = document.getElementById('search');
  const commands = Array.from(document.querySelectorAll('.command'));
  search.addEventListener('input', ()=>{
    const q = search.value.trim().toLowerCase();
    commands.forEach(li=>{
      const text = li.textContent.toLowerCase();
      if(q === '' || text.includes(q)) li.style.display = '';
      else li.style.display = 'none';
    });
  });
});