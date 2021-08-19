# Dockerを用いて開発環境をセットアップする
1. Visual Studio Codeに拡張機能「Remote - Containers」をインストール
2. 右下の`><`を押して「Reopen in Container」
3. 自動的にコンテナイメージのビルドやコンテナ作成を行ったのち、`npm install`が実行される
4. `.env`ファイルを作成し、`BROWSER=none`を記載

あとは普通にデバッグも可能．
コンソールはコンテナ内のものであることには注意する必要がある(gitのconfigなど)．