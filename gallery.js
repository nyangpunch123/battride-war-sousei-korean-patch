'use strict';
const thumbs = [...document.querySelectorAll('.gallery-thumb')];
const shots = thumbs.map(button => ({src:button.querySelector('img').getAttribute('src'), label:button.querySelector('span').textContent}));
const descriptions = ['한글로 표시된 메인 메뉴와 모드 설명','디케이드 등장 장면의 한국어 영상 자막','한국어 목표와 라이더 대사가 표시된 전투 화면','한글 결과 항목과 한국어 트로피 이름이 표시된 화면','킨타로스와 모모타로스가 등장하는 한국어 스토리 대화 화면'];
const dialog = document.querySelector('.screenshot-dialog');
const opener = document.querySelector('.screenshot-open');
let selected = 0;
function select(index) {
  selected = (index + shots.length) % shots.length;
  const shot = shots[selected];
  for(const image of [opener.querySelector('img'),dialog.querySelector('.dialog-image')]) {
    image.src = shot.src;
    image.alt = descriptions[selected];
  }
  opener.setAttribute('aria-label',shot.label+' 크게 보기');
  document.querySelector('.gallery-feature strong').textContent = shot.label;
  dialog.querySelector('.dialog-top>span').textContent = shot.label;
  const count = String(selected+1).padStart(2,'0')+' / '+String(shots.length).padStart(2,'0');
  document.querySelector('.gallery-count').textContent = count;
  dialog.querySelector('.dialog-bottom>span').textContent = count;
  thumbs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===selected)));
}
thumbs.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
opener.addEventListener('click',()=>dialog.showModal());
dialog.querySelector('.dialog-top button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();select(selected+(event.key==='ArrowLeft'?-1:1));}
});
for(const group of ['.gallery-arrows','.dialog-bottom']) {
  const buttons = document.querySelectorAll(group+' button');
  buttons[0].addEventListener('click',()=>select(selected-1));
  buttons[1].addEventListener('click',()=>select(selected+1));
}
document.querySelectorAll('.hash').forEach(box=>{
  box.querySelector('button').addEventListener('click',async()=>{
    let message;
    try {await navigator.clipboard.writeText(box.querySelector('code').textContent);message='복사 완료';}
    catch {message='직접 선택해 복사';}
    box.querySelector('button').textContent=message;
    box.querySelector('[aria-live]').textContent=message;
  });
});
