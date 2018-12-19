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