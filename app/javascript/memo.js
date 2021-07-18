// HTML部分を記述する変数を定義
const buildHTML = (XHR) => {
  const item = XHR.response.post;
  // responseプロパティ サーバーからのレスポンス情報が格納されたプロパティ。postキーの値を受取り変数に代入
  // postsコントローラーのcreateアクションにrender json:{post: post}の記述があるからresponseプロパティで受け取れる
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時:${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
    // 式展開でhtmlの記述。レスポンスから作成日時と内容を表示
  return html; //レスポンスの値が入った変数htmlを戻り値として返す
};


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

    XHR.onload = () => { // onloadプロパティ レスポンスの受信に成功したときの処理を記述するプロパティ
      if (XHR.status != 200) { // ステータスコードが200でない(リクエストが正常に完了していない)ときのの処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        // ポップアップでアラートを出す。ステータスコードとエラーメッセージを表示
        return null; // JavaScriptの処理から抜け出すことができる。エラーがでた場合はこれ以降の処理は行わない。
      };
      const list = document.getElementById("list");
      // idを指定して投稿されたメモ1つ1つが入るdiv要素を取得。取得した要素の直後にHTMLを挿入する
      const formText = document.getElementById("content");
      // メモ投稿フォームのidを取得。投稿後もフォームから投稿内容が消えない問題の解決に使用する。
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // insertAdjacentHTMLメソッド HTMLをある要素の指定した箇所に挿入するメソッド
      // 挿入したい要素名.insertAdjacentHTML("挿入したい位置", 挿入するHTML); afterendで要素の直後に挿入
      // XHRを引数として変数buildXHRに渡している。
      formText.value = "";
      // ビューに投稿内容が反映された後に、フォームに空の文字列を代入することで中身をリセットしている
    };
  });
};

window.addEventListener('load', post); //最後の;いる?