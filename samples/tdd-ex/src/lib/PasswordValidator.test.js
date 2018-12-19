import PasswordValidator from './PasswordValidator';

describe('password validator', () => {
    it("妥当な場合は成功を返す", () => {
        const password = "samplePass1";
        const validator = new PasswordValidator(password);
        return validator.validate()
            .then((res) => {
                expect(res).toEqual({
                    success: true
                });
        });
    });
    
    it("should return error with empty password", () => {
        const password = "";
        const validator = new PasswordValidator(password);
        return validator.validate()
            .then((res) => {
                expect(res.success).toBeFalsy();
                expect(res.message).toBe('パスワードは必須です。')
            });
    })
    it("should return error with short password", () => {
        const password = "test";
        const validator = new PasswordValidator(password);
        return validator.validate()
            .then((res) => {
                expect(res.success).toBeFalsy();
                expect(res.message).toBe('パスワードが短すぎます。')
            });
    })
    it("大文字、小文字、数字を全て含まない場合はエラーを返す。", async () => {
        const password1 = "testPass";
        const password2 = "testpass1";
        const password3 = "TESTPASS1";
        const validator1 = new PasswordValidator(password1);
        const validator2 = new PasswordValidator(password2);
        const validator3 = new PasswordValidator(password3);
        const res1 = await validator1.validate().then(res => res);
        const res2 = await validator2.validate().then(res => res);
        const res3 = await validator3.validate().then(res => res);
        expect(res1.success).toBeFalsy();
        expect(res2.success).toBeFalsy();
        expect(res3.success).toBeFalsy();
        expect(res3.message).toBe('パスワードは大文字、小文字、数字全てを含む必要があります。');
    })
});