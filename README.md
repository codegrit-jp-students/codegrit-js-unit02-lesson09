# Lesson 9. Jestによるテストとテスト駆動開発(TDD)

## 目的

- なぜテストをするのか理解する。
- Jestを利用したテストコードの書き方を知る。
- 実際にJestを利用してみる。

## テストとは

プログラムを行う際、最初はどんどんと書けていっても段々と一つコードに変更を行うと、他の部分にも影響が出てしまう。あるいは、既に書かれたコードをパフォーマンス改善や可読性の向上のために書き直したい。というようなことが出てきます。こんな時に、書き直したコードがちゃんと機能するかチェックしたい、また他の影響が出そうな部分もちゃんと今まで通り動くかチェックしたい。と考えるはずです。しかし、これを全て手動でチェックしようとするとプログラムを変更する度にそれを行う必要があり、面倒な上、チェックをし忘れたり、ブラウザを開くのに時間がかかったりして非効率です。こうした非効率性を下げるために、プログラマはテストを書きます。

## テストフレームワーク

Javascriptでは、テストを行うためのフレームワークは非常に多くあります。現在最も人気があるのはMochaというものです。またJasmineというフレームワークも非常に人気があります。CodeGritではReactでのテストフレームワークとして標準になっており、現在サーバーサイドJavascriptのテストフレームワークとしても人気が高まっているJestを学びます。

## Jestフレームワークとは

Jestは元々FacebookがReactのテストをより効率的に行うためにJasmineをベースに作成したテストフレームワークです。Jestの最大のメリットはReactのテストが行いやすいという点です。また、初期設定が簡単というメリットもあります。Mochaを使いたいという場合、React側はJestでテストし、サーバー側はMochaでテストするという風になりスイッチングコストが発生します。そのため、最初の段階ではJestを使って全てをテストして、テストコードを書くこと自体に慣れるのが良いでしょう。

## Jestを設定する

Jestを利用するには、NPMパッケージからJestをインストールする必要があります。まずはjest-testというフォルダを作成して、`yarn init`でpackage.jsonを作成しましょう。

```bash
$ mkdir jest-test
$ cd jest-test
$ yarn init -y
$ yarn add -D jest babel-jest
```

**完成コードはこちら:** [サンプルコード](https://github.com/codegrit-jp-students/js-unit02-lesson09-sample01)

上記でbabel-jestはES6のコードをES5にトランスパイルするために利用します。

次に、`package.json`を編集し、NPMスクリプトからテストを呼び出せるようにします。また同時にトランスパイルが全ての.js拡張子を持つファイルについて行われるよう設定します。

```json
/* package.json */

{
  ...
  "scripts": {
    "test": "jest --watchAll"
  },
  "jest": {
    "transform": {
      "^.+\\.jsx?$": "babel-jest"
    }
  },
  "devDependencies": {...}
}
```

最後に、トランスパイルがきちんと行われるようにbabel-preset-envというプラグインをダウンロードし、babelの設定ファイルを編集します。babelの設定ファイルは`.babelrc`という名前でプロジェクトのルートディレクトリに作成します。

- babel-preset-envのインストール

```bash
$ yarn add -D babel-preset-env
```

- .babelrcの作成。

```
{
  "presets": ["env"]
}
```

以上で準備が完了しました。試しにtestを動かしてみましょう。

```bash
$ yarn test
No tests found
...
```

上記のように"No tests found"と表示されたら成功です。


## 初めてのテスト

テストの準備が整ったのでいよいよ初めてのテストを書いていきましょう。

1. sum.jsを作成する

まずはsrcフォルダを作成し、sum.jsというファイルを作成します。

```bash
$ mkdir src
$ touch sum.js
```

2. 関数を書く

sum.jsには以下のように2つの引数を足して結果を返す簡単な関数を書きます。

```javascript
function sum(a, b) {
  return a + b;
}

export default sum;
```

3. sum.test.jsファイルを作成する

このコードのテストコードを書いていきましょう。jestでは`.test.js`という名前のファイルを自動的にjestのテストコードと認識してテストしてくれます。sum.jsというファイルをテストするので、`sum.test.js`というファイルを作成してテストを書いていきます。

```bash
$ touch sum.test.js
```

4. テストコードを書く

テストコードは以下のようになります。

```javascript
import sum from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3); 
});
```

いかがでしょう。コードを見ただけでもなんとなく何を行っているかは理解出来るのではないでしょうか。上記は、sum(1,2)の結果が3かどうかをチェックしています。シンタックスについては後ほど説明していきます。


5. テストを実行する

テストが通るかどうか確認するために、jestを走らせましょう。すると以下のように表示されるはずです。

```bash
$ yarn test
PASS  src/sum.test.js
  ✓ adds 1 + 2 to equal 3 (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.171s
```

6. コードを変えてみる。

テストが通らないようにコードを変えてみましょう。試しにsum.jsのコードを以下のように変えてみましょう。

```javascript
function sum(a, b) {
  return a + b + 1;
}

export default sum;
```

すると、テストが自動的に走ります。

```bash
FAIL  src/sum.test.js
  ✕ adds 1 + 2 to equal 3 (14ms)
...
```

上記のようにFAILと失敗した旨が書かれ、その後に詳しいテストの失敗した部分と内容が表示されます。sum.jsのコードを基に戻すとテストが再度通ります。

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

## テスト駆動開発

テスト駆動開発(TDD - Test Driven Development)とは、ソフトウェア開発のベストプラクティスの一つです。アプリケーションの開発では、一つ一つの機能について起こって欲しい動作があります。テスト駆動開発においては、まずコードを書いてから、そのコードをテストする流れを逆に行います。つまり、まずテストを書き、そのテストが通るようにコードを書きます。このように逆のプロセスを取ることのメリットは、予めコードがどういう動きをするのかを明確に出来るということです。それによって、テストが通るように書くコードの最初のクオリティを高めることが出来ます。

## テスト駆動開発の流れ

テスト駆動開発は以下のような流れで行います。

1. テストを書く
2. テストが通らないことを確認する
3. コードを書く
4. テストが通ることを確認する
5. コードをリファクタリングする


## 初めてのテスト駆動開発

では実際にテスト駆動開発を行っていきましょう。今回はレッスン6で作成したpasswordValidatorを一から作っていくことを考えてみましょう。

- [サンプルコード](https://github.com/codegrit-jp-students/js-unit02-lesson09-sample02)

### テスト用のファイルを作成

まずは、このレッスンでの説明に従ってjestのテストが行えるようにしましょう。完了したらsrcディレクトリとその下にlibディレクトリを作成します。libディレクトリには`passwordValidator.js`と`passwordValidator.test.js`の2つを作って下さい。passwordValidator.jsには以下のクラスを作成します。

```javascript
class PasswordValidator {

}

export default PasswordValidator;
```


### describeブロック

ここまでは紹介しておりませんでしたが、jestでは、同じグループ内のテストをdescribeブロックで分けることが出来ます。何を対象にテストを行うのかが明確になるので、これを使ってみましょう。

```javascript
import PasswordValidator from './passwordValidator';

describe('password validator', () => {

});
```

### テストしたいものを決める

テストを行う場合は、テスト対象のコードに期待する動きを考える必要があります。今回のパスワードバリデーションの仕様を考えてみましょう。今回は、レッスン6で作成したものに加えてパスワードの強度を高めるために、必ずアルファベットの大文字、小文字と数字が入っていなければいけない、という条件をつけましょう。

1. 妥当なパスワードの場合は成功を返す。
2. パスワードが空の場合は失敗を返す。
3. パスワードが短すぎる場合は失敗を返す。
4. パスワードにアルファベットの大文字、小文字、数字が全て入っていなければ失敗を返す。

これらの4つのパターンのテストを作成していきます。

### itブロック

itブロックは、testブロックのエイリアス(名前の違う同じ関数)です。文脈によってtestとitを使い分けます。itを使う場合は**'~すべきだ'**のような表現をしたい時につかうことが多いです。ただ日本語でテストの説明を書く場合はあまり違いが出ないかもしれません。今回はこのitブロックを使ってみましょう。

```javascript
describe('password validator', () => {
  it('妥当な場合は成功を返す', () => {});
  it('空の場合は失敗を返す', () => {});
  it('短すぎる場合は失敗を返す', () => {});
  it('アルファベットの大文字、小文字、数字のいずれかがなければ失敗を返す', () => {});
});
```

いかがでしょうか、このようにするとコードに期待する動きがあらかじめ明確になりますね。ここでテストの結果を見てみましょう。

```bash
 PASS  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す
  ✓ 空の場合は失敗を返す
  ✓ 短すぎる場合は失敗を返す
  ✓ アルファベットの大文字、小文字、数字のいずれかがなければ失敗を返す (1ms)
```

このように何もテストを書いていないために現状テストが全て通ってしまっています。これを避けるために、jestにはskipという関数が用意されています。これを利用してテストが書かれていないブロックについてはテストをskipしましょう。

```javascript
describe('password validator', () => {
  it.skip('妥当な場合は成功を返す', () => {});
  it.skip('空の場合は失敗を返す', () => {});
  it.skip('短すぎる場合は失敗を返す', () => {});
  it.skip('アルファベットの大文字、小文字、数字のいずれかがなければ失敗を返す', () => {});
});
```

するとテスト結果が以下のように更新されるはずです。skippedという文字が出ていますね。

```bash
Test Suites: 1 skipped, 0 of 1 total
Tests:       4 skipped, 4 total
```

### 妥当なパスワードに対するテストを書く

では実際に妥当なパスワードが成功する場合の例を書いていきましょう。すると以下のようになります。

```javascript
describe('password validator', () => {
  it("should success with valid value", () => {
    const password = "samplePass1"; // ①
    const validator = new PasswordValidator(password); 
    return validator.validate() // ②
      .then((res) => {
        expect(res).toEqual({ // ③
          success: true
        });
    });
  });
});
```

以下、順番に解説していきます。

- ①の部分
Validationが成功するようなパスワードの値を定義しています。

- ②の部分
PasswordValidatorのインスタンス作成後、validate関数を呼び出しています。validate関数はPromiseを返します。

- ③の部分
validate関数の結果をテストしています。バリデーション成功の場合は`{ success: true }`というオブジェクトを返します。

さて、テストコードが出来たらテストの結果を見てみましょう。

```bash
 FAIL  src/lib/PasswordValidator.test.js
  password validator
  ✕ should pass with valid data (6ms)

  ● password validator › should pass with valid data
  ...
```

テストの結果を再度見てみましょう。以下のようにテスト失敗という表示が出るはずです。

```bash
 FAIL  src/lib/PasswordValidator.test.js
  password validator
  ✕ 妥当な場合は成功を返す (9ms)
  ○ skipped 3 tests

  ● password validator › 妥当な場合は成功を返す
```

### validate関数を実装する。

では、このテストが通るようにコードを実装していきましょう。このテストを通すにはpasswordValidatorクラスにvalidate関数を定義し、その関数はPromiseオブジェクトを返します。また、resolve状態の場合であれば`{ success: true }`というオブジェクトを返さなければなりません。またvalidatorにパスワードの値を渡しているので、constructorの定義も必要です。

```javascript
class PasswordValidator {
  constructor(password) {
    this.password = password;
  }
  validate() {
    return new Promise((resolve, reject) => {
      resolve({ success: true }); 
    });
  }
}

export default PasswordValidator;
```

上記の通り、現状validate関数内では何もしておらず、そのままresolve状態のPromiseオブジェクトを返しています。この状態でテストを見てみましょう。

```bash
 PASS  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す (2ms)
  ○ skipped 3 tests
```

上記のように、テストが通ることが確認出来たので次のテストに進みます。

### 失敗時のテストを作成する。

まずは、パスワードが空白文字の場合と、短すぎる場合のテストをしましょう。すると以下のようになります。先ほど作成した成功時のものとほとんど一緒ですが、戻ってくるオブジェクトが異なります。

```javascript
  it('空の場合は失敗を返す', () => {
    const password = "";
    const validator = new PasswordValidator(password); 
    return validator.validate()
      .then((res) => {
        expect(res).toEqual({
          success: false,
          message: 'パスワードは必須です。'
        });
    });
  });
  it('短すぎる場合は失敗を返す', () => {
    const password = "test";
    const validator = new PasswordValidator(password); 
    return validator.validate() 
      .then((res) => {
        expect(res).toEqual({
          success: false,
          message: 'パスワードが短すぎます。'
        });
    });
  });
```

テスト結果を再度確認すると、テストに失敗していることが分かります。

```bash
 FAIL  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す (2ms)
  ✕ should return error with empty password (8ms)
  ✕ should return error with short password (1ms)
  ○ skipped 1 test
```

### 失敗時のテストを通す

では、上記のテストが成功するようにコードを書いていきましょう。

```javascript
class PasswordValidator {
  ...
  validate() {
    return new Promise((resolve, reject) => {
      if (!this.password) {
        resolve({
          success: false,
          message: 'パスワードは必須です。'
        })
      } else if (this.password.length < 8) {
        resolve({
          success: false,
          message: 'パスワードが短すぎます。'
        })
      } else {
        resolve({ success: true });
      }
    });
  }
}

export default PasswordValidator;
```

さて、validate関数内に全てをまとめているため、冗長ですが、パスワードが空白の場合と、8文字未満の場合それぞれバリデーションが失敗するように出来ました。再度テストの結果を見てみましょう。

```bash
 PASS  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す (1ms)
  ✓ should return error with empty password (1ms)
  ✓ should return error with short password
  ○ skipped 1 test
```

無事に、テストが通りました。

### パスワードの強度アップのテストを書く

さて、最後にパスワードの強度アップのために"大文字、小文字、数字の全てを含む"パスワードを強制するためのテストを書きましょう。注意点として、先ほどまでのテストでは一つのパスワードの例だけでチェックできましたが、この場合は大文字、小文字だけで書いた場合はバリデーションに失敗するけど、小文字と数字だけだと成功してしまう、ということが起こりうるので、いくつかのパターンをテストします。

```javascript
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
```

テスト結果を再度見てみましょう。

```bash
 FAIL  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す (1ms)
  ✓ should return error with empty password (1ms)
  ✓ should return error with short password
  ✕ 大文字、小文字、数字を全て含まない場合はエラーを返す。 (6ms)
```

無事、テストが通らないことが確認出来たので、コードを実装します。

### 失敗時のテストを通す

大文字、小文字、数字を含むかのテストは正規表現で行います。

```javascript
const re1 = /[a-z]+/; // 小文字のアルファベットを1文字以上含む。
const re2 = /[A-Z]+/; // 大文字のアルファベットを1文字以上含む。
const re3 = /[0-9]+/; // 数字を1文字以上含む。
```

これを使ってコードは以下のようになります。`this.password`を何度も書くのは大変なため、`val`という変数を作成しているので注意して下さい。

```javascript
class PasswordValidator {
  ...
  validate() {
    const val = this.password;
    const re1 = /[a-z]+/;
    const re2 = /[A-Z]+/;
    const re3 = /[0-9]+/;
    return new Promise((resolve, reject) => {
      if (!val) {
        resolve({
          success: false,
          message: 'パスワードは必須です。'
        })
      } else if (val.length < 8) {
        resolve({
          success: false,
          message: 'パスワードが短すぎます。'
        })
      } else if (!(re1.test(val) && re2.test(val) && re3.test(val))) {
        resolve({
          success: false,
          message: 'パスワードは大文字、小文字、数字全てを含む必要があります。'
        })
      } else {
        resolve({ success: true });
      }
    });
  }
}

export default PasswordValidator;
```

テストの結果を再度見てみましょう。

```bash
 PASS  src/lib/PasswordValidator.test.js
  password validator
  ✓ 妥当な場合は成功を返す (2ms)
  ✓ should return error with empty password
  ✓ should return error with short password (1ms)
  ✓ 大文字、小文字、数字を全て含まない場合はエラーを返す。
```

### リファクタリング

さて、ここまでで全てのテストが無事通りました。しかし、レッスン6で書いたコードと比べて、現状のコードはvalidate関数に全てがまとめられてしまっています。また、何を一体テストしているのか、validate内のコードを全て追いかけないと分かりません。これでは、後から見た時に把握が大変です。そこで、validate関数を複数に分けて、コードを見やすくしていきましょう。このように、現状あるコードを機能は変えずに改善する(パフォーマンスあるいは、可読性)ことを**リファクタリング**と呼びます。

最終的なコードは、以下のようになります。レッスン6とほぼ同一です。先ほどまでのコードと比較して、`_cannotEmpty`、`_checkLength`、`_checkStrength`の3つの関数名を見るだけで、何をしているかが分かるようになっています。

```javascript
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
```

例えば、インターネット上で公開されているオープンソースのコードを見たりすると、非常に洗練されたコードが書かれていて、このレベルのコードはとても書けないと思う方も多いかと思います。しかし、実際には洗練されたコードは今回のように、最初に書かれた冗長なコードに対して複数回リファクタリングをした結果であることが少なくありません。また、リファクタリングを何度も行っていくことでプログラミングのレベルが上がると、リファクタリング後でないと書けなかったようなコードが最初から書けるようになっていきます。ただ動くコードを書いて終わってしまっても良いのですが、それだとプログラマとしてのレベルが止まってしまうので、是非より可読性の高いコードを書けるようリファクタリングを繰り返して下さい。


## 何をテストするのか

さて、ここまでテスト駆動開発について説明してきましたが、ソフトウェア開発の世界では宗教論てきなものがあり、そもそも全てのコードをテスト駆動開発にする必要はない、という意見もあります。例えば、Ruby on Railsの作者として著名であり、37Signalsという企業のCEOでもあるDHH(David Heinemeier Hansson)氏は、[TDD is dead. Long live testing.]というブログを公開し物議を醸しました。今回のように一つ一つの機能をテストすることをユニットテスト(単体テスト)と言いますが、DHH氏はこうしたユニットテストにTDDはフォーカスしがちであると述べています。DHH氏の場合はこうしたユニットテストはほとんど書かず、複数の機能が組み合わさった部分の(インテグレーションテストと呼びます)テストを重要視しています。

また、小規模なアプリケーションで個人で開発するという場合であれば、テストを行う部分を重要な部分のみに限定するというのも良いかと思います。CodeGritでは、上述の通り、リファクタリングでプログラミングのレベルが高まることや、慣れるまでは今回のような冗長なコードを書きがちですので、練習も含めてテストを多めに書くことを推奨します。

## コードカバレッジ

JestにはデフォルトでIstanbulというテストがどの程度のコードについて行われているか(コードカバレッジと呼ぶ)を調査するツールが組み込まれています。これを有効にしておくと、テスト量がどの程度あるか簡単に確認出来ます。

設定は、package.jsonに以下のように書くことで出来ます。

```json
  "jest": {
  "transform": {
    "^.+\\.jsx?$": "babel-jest"
  },
  "collectCoverageFrom": [
    "**/src/**/*.js"
  ],
  "collectCoverage": true
  },
```

テストを再度起動すると以下のように表示されるはずです。

```bash
----------------------|----------|----------|----------|----------|-------------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------|----------|----------|----------|----------|-------------------|
All files             |      100 |      100 |      100 |      100 |                   |
 PasswordValidator.js |      100 |      100 |      100 |      100 |                   |
----------------------|----------|----------|----------|----------|-------------------|

```

PasswordValidatorについては、コードカバレッジ100%という結果が出ました。

## その他の機能

Jestには、モックや、setup、teardownといった今回説明していない機能もあります。こうした機能はReactコースでも触れていく予定です。またjestのドキュメントは非常に良く出来ていますので、英語ではありますがこちらも確認すると良いでしょう。

## チャレンジ

- [チャレンジ9](./challenge/README.md)

## 更に学ぼう

### 記事で学ぶ

- [Jest公式ドキュメント(日本語)](https://facebook.github.io/jest/docs/ja/getting-started.html)