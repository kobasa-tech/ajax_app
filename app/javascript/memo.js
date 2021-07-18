function post (){ //処理名postを定義
  const submit = document.getElementById("submit");
  // idから投稿ボタンの要素を取得し変数submitに代入
  // <input type="submit" name="commit" value="投稿する" id="submit" data-disable-with="投稿する">

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    // 投稿ボタンをクリックしたときにイベント発火。アロー関数を使用。
    // preventDefault()メソッド 規定のイベントを無効化するメソッド。eはイベントオブジェクトといいイベント発生時の情報を持ったオブジェクト。
    // この場合は「投稿ボタンをクリックした」という情報を持ったオブジェクトになる。投稿ボタンをクリックしたという現象を無効化している。
    // 無効化することにより、ブラウザからのリクエストを防いでいる。無効化しないとリクエストがブラウザとJavaScriptで重複してしまう。
    // ビューの記述を変更しないと投稿内容は表示されない。サーバーには送信パラメータが表示されるので今はok

    const form = document.getElementById("form");
    // idからフォーム情報を取得し変数formに代入。<form>~</form>まで全て取得している。
    const formData = new FormData(form);
    // FormDataオブジェクト
    // new FormData(フォームの要素); オブジェクトを生成しフォームに入力された値を取得する。非同期通信で送信するために必要。
    const XHR = new XMLHttpRequest();
    // XMLHttpRequestオブジェクト JavaScriptを用いてサーバーとHTTP通信を行うときに利用するオブジェクト
    // new XMLHttpRequest(); オブジェクトを生成。これにリクエスト内容を入れていく。
    XHR.open("POST", "/posts", true);
    // open()メソッド XMLHttpRequestオブジェクトのメソッドでリクエストの内容を指定するためのメソッド。
    // 第一引数にHTTPメソッド、第二引数にパス、第三引数に非同期通信であるかを記述する。
    // 記述は非同期通信でcreateアクションに更新の通信をする記述。
    XHR.responseType = "json";
    // responseTypeプロパティ 受け取るレスポンスのデータフォーマット(データのやり取りの際に使われる型)を指定する。
    // リクエストを送信する際にレスポンスに欲しい型をあらかじめ指定する必要がある。「json」形式に指定。
    XHR.send(formData);
    // send()メソッド リクエストを送信するメソッド。XMLHttpRequestオブジェクトのメソッド。
    // 生成したフォームデータを送信している。
  });
};

window.addEventListener('load', post); //最後の;いる?