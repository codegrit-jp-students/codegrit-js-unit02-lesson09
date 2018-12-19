import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test("1 + 2 は4ではない", () => {
    expect(sum(1, 2)).not.toBe(4);
})

test("Check object", () => {
    const obj1 = { "1": "One", "2": "Two" };
    expect(obj1).toEqual({ "1": "One", "2": "Two" });
})

test('メールアドレスをチェック', () => {
    const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
    expect('example@testmail.com').toMatch(re);
});

test('test toContain', () => {
    let companies = ["Apple", "Facebook", "Google"];
    expect(companies).toContain("Apple");
    expect(companies).not.toContain("Microsoft");
})

function throwError() {
    throw new Error('エラーが発生しました');
}

test('compiling android goes as expected', () => {
    expect(throwError).toThrow();
    expect(throwError).toThrow(Error);
    expect(throwError).toThrow('エラーが発生しました');
    expect(throwError).toThrow(/エラー/); // 正規表現も使えます。
});