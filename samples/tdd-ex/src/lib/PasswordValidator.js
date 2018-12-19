class PasswordValidator {
    constructor(password) {
        this.password = password;
        this._cannotEmpty = this._cannotEmpty.bind(this);
        this._checkLength = this._checkLength.bind(this);
        this._checkStrength = this._checkStrength.bind(this);
    }
    validate() {
        return this._cannotEmpty()
            .then(this._checkLength)
            .then(this._checkStrength)
            .then((res) => {
                return { success: true }; // Promise.resolve({ success: true })と同一
            })
            .catch(err => err);
    }
    _cannotEmpty() {
        if (this.password) {
            return Promise.resolve();
        } else {
            return Promise.reject({
                success: false,
                message: 'パスワードは必須です。'
            });
        }
    }
    _checkLength() {
        if (this.password.length >= 8) {
            return Promise.resolve();
        } else {
            return Promise.reject({
                success: false,
                message: 'パスワードが短すぎます。'
            });
        }
    }
    _checkStrength() {
        const val = this.password;
        const re1 = /[a-z]+/g;
        const re2 = /[A-Z]+/g;
        const re3 = /[0-9]+/g;
        if (re1.test(val) && re2.test(val) && re3.test(val)) {
            return Promise.resolve();
        } else {
            return Promise.reject({
                success: false,
                message: 'パスワードは大文字、小文字、数字全てを含む必要があります。'
            });
        }
    }
}

export default PasswordValidator;