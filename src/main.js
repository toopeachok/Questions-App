import '@/styles.scss'
import {createModal, isValid} from "@/utils";
import {Question} from "@/question";
import {authWithEmailAndPassword, getAuthForm} from "@/auth";

const questionForm = document.forms['question-form'];

const questionInput = questionForm.elements['question-input'];

const submitBtn = questionForm.elements['submit-btn'];

const modalBtn = document.getElementById('modal-btn');

function submitForHandler(event) {
  event.preventDefault();

  if (isValid(questionInput.value)) {

    const question = {
      text: questionInput.value.trim(),
      date: new Date().toJSON()
    };

    submitBtn.disabled = true;

    Question.create(question).then(() => {
      questionInput.value = '';
      questionInput.className = '';
      submitBtn.disabled = false;
    });

  }

}

questionInput.addEventListener('input', () => {
  submitBtn.disabled = !isValid(questionInput.value);
});

questionForm.addEventListener('submit', submitForHandler);

window.addEventListener('load', Question.renderList);

modalBtn.addEventListener('click', openModal);

function openModal() {
  createModal('Authorization', getAuthForm());

  document.forms['auth-form']
    .addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
  event.preventDefault();

  const email = document.forms['auth-form'].elements['email-input'].value;
  const password = document.forms['auth-form'].elements['password-input'].value;
  const btn = document.forms['auth-form'].elements['auth-btn'];

  btn.disabled = true;
  authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error!', content);
  } else {
    createModal('Questions list', Question.listToHTML(content))
  }
}