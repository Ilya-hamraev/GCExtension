class Form {
  constructor(form) {
    this._form = form;
  }

  getValues() {
    this._formData = new FormData(this._form);
    return Object.fromEntries(this._formData);
  }

  clearForm() {}

  _getTemplate() {}

  generateTemplate() {}
}

export default Form;
