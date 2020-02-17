import Marionette from 'backbone.marionette';
import Handlebars from 'handlebars';

class Todo extends Marionette.LayoutView
{
  constructor(options)
  {
    options.template = Handlebars.compile('<span>{{this.text}} - {{this.assignee}}</span><button id="btn-remove">Remove</button>');
    options.tagName = 'li';

    super(options);
  }

  modelEvents()
  {
    return {
      change: 'render',
    };
  }

  events() {
    return {
      'click button': 'itemSelect',
      'click span': 'itemEdit',
      'blur input': 'save'
    }
  }

  ui()
  {
    return {
      assignee: '#id_assignee',
      text: '#id_text'
    };
  }

  itemSelect() {
    this.model.destroy();
  }

  save(e) {
    const newText = e.target.value;
    console.log(e.target);
    const newTodoText = newText.substring(0, newText.indexOf("-") - 1);
    const newAsignee = newText.substring(newText.indexOf("-") + 2);
    this.model.set('assignee', newAsignee);
    this.model.set('text', newTodoText);
    e.target.setAttribute('style', 'display: none');
  }

  itemEdit(e) {
    Element.prototype.appendAfter = function (element) {
      element.parentNode.insertBefore(this, element.nextSibling);
    },false;

    const selectedItem = e.currentTarget;
    const span = selectedItem.parentElement.firstChild;
    const prevText = selectedItem.parentElement.firstChild.innerText;
    const inputEl = document.createElement('input');

    inputEl.setAttribute('type', 'text');
    inputEl.setAttribute('class', 'edit-input');
    inputEl.setAttribute('value', `${prevText}`);
    // inputEl.onblur = this.save;
    inputEl.appendAfter(selectedItem);
    inputEl.focus();
    span.setAttribute('style', 'display: none');
  }
}

export default class ListView extends Marionette.CollectionView
{
  constructor(options)
  {
    options.tagName = 'ol';
    options.childView = Todo;

    super(options);
  }
}