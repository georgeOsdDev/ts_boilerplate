#!/usr/bin/env bash
set -Ceuo pipefail

# CircleCIでのビルド用スクリプト
# bitbucket-pipelineで使用しているbuild.shとは
# 成果物のアーカイブ処理が異なります

if [ -h $0 ]
then
  ROOT_DIR="$(cd "$(dirname "$(readlink -n "$0")")" && pwd)"
else
  ROOT_DIR="$(cd "$(dirname $0)" && pwd)"
fi
cd "$ROOT_DIR"

DATE=`date '+%Y%m%d'`
VERSION=$(npm run packageVersion --silent)

# ブランチ名に/が含まれるとファイル名がややこくなるので_に置換
BRANCH=`echo ${CIRCLE_BRANCH} | sed "s/\//_/g"`

DIR=mba-media-stream-capture
ZIP=${DIR}.zip
METAFILE=_moduleInfo.txt

rm -rf $METAFILE
rm -rf $ZIP
rm -rf $DIR/*
mkdir -p ${DIR}/public/assets/script/agent/
touch $METAFILE
echo "Module: $ZIP, Version: ${VERSION}, Branch: ${BRANCH}, Commit: ${CIRCLE_SHA1}, Date: ${DATE}" >| $METAFILE
cp $METAFILE $DIR/

yarn run build
if [ $? -ne 0 ]; then
    echo "Error occurred while executing 'yarn run build'"
    exit 1;
fi
cp -R $ROOT_DIR/dist/mba-media-stream-capture.bundle.min.js ./${DIR}/public/assets/script/agent/
zip -rq $ZIP $DIR
rm -rf $DIR

# S3://mbwac-build-artifacts/mba-media-stream-capture/
# ├── develop
# │       ├── v24.0.0
# │       │       ├── _moduleInfo.txt
# │       │       └── mba-media-stream-capture.zip
# │       ├── v25.0.0
# │       |       ├── _moduleInfo.txt
# │       │       └── mba-media-stream-capture.zip
# │       └── latest
# │               ├── _moduleInfo.txt
# │       │       └── mba-media-stream-capture.zip               // 基本的にmbwac環境はここのファイルをリリース(mba-buildの参照先。　また、circleCiのpublish stepで中身をcdn用S3にアップロードしている)
# └── stage
#         ├── v24.0.0
#         │       ├── _moduleInfo.txt
#         │       └── mba-media-stream-capture.zip
#         ├── v25.0.0
#         │       ├── _moduleInfo.txt
#         │       └── mba-media-stream-capture.zip
#         └── latest                              // モビルス環境への次期リリース用(mba-buildはここから取得)
#                 ├── _moduleInfo.txt
#                 └── mba-media-stream-capture.zip

# CircleCIではJOBのartifactにディレクトリとして保存
# S3にも保存するのでlatestと日付両方に同じものをおいておく
# .circleci/config.ymlを参照
mkdir -p artifact/$BRANCH/latest
mkdir -p artifact/$BRANCH/$VERSION
cp $ZIP artifact/$BRANCH/latest/
cp $ZIP artifact/$BRANCH/$VERSION/
cp $METAFILE artifact/$BRANCH/latest/
cp $METAFILE artifact/$BRANCH/$VERSION/

echo "Finished"
