//@ts-check

const titleCon = document.getElementById('choose-title');
// const titleBtns = titleCon.getElementsByTagName('button');
const titleBtns = document.getElementsByClassName('button__select');
const titleInfo = document.getElementsByClassName('title__info');
const saveBtn = titleCon.getElementsByTagName('input')[0];


for (let i = 0; i < titleBtns.length; i++) {
    titleBtns[i].addEventListener('click', function(el) {
        console.log('clicked');
        checkBtns(this, i);
    });
}

async function checkBtns(el, i) {
    let isSelected = el.classList.contains('button__select--selected');
    if (isSelected) return;
    await deselectBtn();
    await selectBtn(el, i); 
}

async function selectBtn(el, i) {
    if (saveBtn.hasAttribute('disabled')) await saveBtn.removeAttribute('disabled');
    await el.classList.add('button__select--selected');
    await titleInfo[i].classList.add('title__info--open');
}

async function deselectBtn() {
    for (let i = 0; i < titleBtns.length; i++) {
        titleBtns[i].classList.remove('button__select--selected');
        titleInfo[i].classList.remove('title__info--open');
    }
}