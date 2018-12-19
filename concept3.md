## jestの基本的なシンタックス

既に、上記で見ましたがjestの基本亭なシンタックスは以下のようになります。

```javascript
test("テスト内容の説明", () => {
  expect(テスト対象の値やオブジェクト).matcher(テスト対象に期待する値やオブジェクト);
});
```

### testブロック

jestでのテストはtestブロック内に書きます。テスト内容の説明は英語で書く場合全て小文字を使います。例えば上記のように"adds 1 + 2 to equal 3"とし、最初の"add"も大文字から始めません。日本語で書く場合は意識しなくて大丈夫です。説明文は完結に現在形で書くようにします。

### expect関数とmatcher

jestでは、テスト対象の値やオブジェクトで予期するものが返ってきてるかどうかをexpect関数でチェックします。expectの後にmatchersと呼ばれる関数を呼び出し値をチェックします。

### matcher

sum.test.jsでは`.toBe`というmatcherを利用しました。`toBe`はその名の通りテスト対象の値と、toBeに与えられた値が等しいことを示しています。matcherには以下のようなものがあります。

#### プリミティブ型チェック

- .toBe - プリミティブ型のチェック

#### iterative(Array, Object, Set, Map)チェック

- .toEqual - Object型またはArray型のチェック

例: 

```javascript

test("Check object", () => {
  const obj1 = { "1": "One", "2": "Two" };
  expect(obj1).toEqual({ "1": "One", "2": "Two" });
})
```

- .not - この後に他のmathcerを伴って、matcherと一致しないかをチェックします。

例: 

```javascript
test("1 + 2は4ではない ", () => {
  expect(sum(1, 2)).not.toBe(4);
})
```

#### null、undefinedチェック

- .toBeNull - 値がNullかチェック

例: 

```javascript
test("test toBeNull", () => {
  const n = null;
  expect(n).toBeNull();
})
```

- .toBeDefined - 値が定義されているかチェック
- .toBeUndefined - 値がundefinedであるかチェック

```javascript
test("test toBeUndefined", () => {
  let u, d = 1;
  expect(d).toBeDefined();
  expect(u).toBeUndefined();
})
```

#### Boolean型チェック

- .toBeTruthy - 値がtrueかチェック
- .toBeFalsy - 値がfalseかチェック

例: 

```javascript
test("test boolean mathers", () => {
  expect(1 + 2 === 3).toBeTruthy();
  expect(1 + 2 === 4).toBeFalsy();
});
```

#### 数値チェック

- .toBeGreaterThan - 値がより大きいかチェック
- .toBeGreaterThanOrEqual - 値がより大きいか等しいかチェック
- .toBeLessThan - 値がより小さいかチェック
- .toBeLessThanOrEqual - 値がより小さいか等しいかチェック

例: 

```javascript
test("test number matchers", () => {

})
```

- .toBeCloseTo - フロート値の比較でtoEqualを利用したい場合に利用

Javascriptでは全ての数値は`IEEE 754`という規格に則って保存されます。通常の計算時にはこれは問題がほとんど出ないのですが、フロート値の比較や、計算において、時おり問題が発生します。例えば以下のコードはfalseを返します。

```javascript
console.log(0.1 + 0.2 === 0.3); // false
console.log(0.1 + 0.2); // 0.30000000000000004
```

この問題のため、jestではfloat値の比較の場合は`toEqual`ではなく、`toBeCloseTo`を利用する必要があります。

例:

```javascript
test("test toBeCloseTo", () => {
  expect(0.1 + 0.2).toBeCloseTo(0.3);
});
```

#### 文字列チェック

- toMatch - 正規表現を利用して値をチェック

例: 

```javascript
test('メールアドレスをチェック', () => {
  const re = /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i;
  expect('example@testmail.com').toMatch(re);
});
```

#### 配列チェック

- toContain - 配列に値が含まれるかチェック

例: 
```javascript
test('test toContain', () => {
  let companies = ["Apple", "Facebook", "Google"];
  expect(companies).toContain("Apple");
  expect(companies).not.toContain("Microsoft");
})
```

#### 例外チェック

- toThrow - 例外をチェック

例: 
```javascript
function throwError() {
  throw new Error('エラーが発生しました');
}

test('compiling android goes as expected', () => {
  expect(throwError).toThrow();
  expect(throwError).toThrow(Error);
  expect(throwError).toThrow('エラーが発生しました');
  expect(throwError).toThrow(/エラー/); // 正規表現も使えます。
});
```