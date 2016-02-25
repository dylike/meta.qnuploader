'use strict';
/**
 *
 * @name 七牛文件上传的angular插件
 * @description 预计达到的效果如http://jssdk.demo.qiniu.io/类似
 * @features
 *   1. 自动生产pickfiles ID 和 container Id 防止统一页面出现id冲突
 * @dependencies angular, bootstrap
 * @author Yud
 */
angular.module('meta.qnuploader', []).
controller('metaQnuploaderCtrl', ['$scope', '$sce', function ($scope, $sce) {

    //下载全部

    //删除其中的元素
    $scope.delete = function (index) {
        if (confirm('是否确认删除?')) {
            $scope.uploaderDatas.splice(index, 1);
            $scope.success('删除成功');
        }
    };

    //显示失败信息
    $scope.error = function (msg) {
        $scope.message = $sce.trustAsHtml('<span style="color:red">' + msg + '</span>');
        console.error(msg);
        $scope.stop();
    };

    //显示成功信息
    $scope.success = function (msg) {
        $scope.message = $sce.trustAsHtml('<span style="color:green">' + msg + '</span>');
        $scope.stop();
    };

    //停止动画
    $scope.stop = function () {
        $scope.uploading = false;
        $scope.$digest();
    };

    //开始动画
    $scope.start = function () {
        $scope.uploading = true;
        $scope.$digest();
    };
}]).
directive("metaQnuploader", function () {
    return {
        restrict: 'AE',
        scope: {
            'uploaderConfig': '=',
            'uploaderDatas': '='
        },
        templateUrl: 'views/widget/meta.qnuploader.html',
        controller: 'metaQnuploaderCtrl',
        link: function (scope, element) {
            if (Qiniu === undefined) {
                scope.error("七牛上传插件未加载!");
                return;
            } else {
                /**
                 * @param len
                 * @returns {string}
                 */
                var generateRandomAlphaNum = function (len) {
                    var rdmString = "";
                    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) {
                    }
                    return rdmString.substr(0, len);
                };

                var config = scope.uploaderConfig;

                if (!config || !config.uptokenUrl || !config.domain) {
                    scope.error('未定义uptoken或domain');
                    return;
                }
                /**
                 * 给browse_button和container自动生成一段随机的id
                 */
                var _button = element.find('#pickfiles');
                var _container = element.find('#container');

                _button.attr('id', _button.attr('id') + generateRandomAlphaNum(5));
                _container.attr('id', _container.attr('id') + generateRandomAlphaNum(5));

                var _buttonId = _button.attr('id');
                var _containerId = _container.attr('id');

                Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: _buttonId,       //上传选择的点选按钮，**必需**
                    //uptoken_url: '/token',
                    //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                    uptoken_url: config.uptokenUrl,
                    //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                    unique_names: true,
                    // 默认 false，key为文件名。若开启该选项，SDK会为每个文件自动生成key（文件名）
                    // save_key: true,
                    // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
                    domain: config.domain,
                    //bucket 域名，下载资源时用到，**必需**
                    container: _containerId,           //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: config.maxSize,           //最大文件体积限制
                    flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                    max_retries: 3,                   //上传失败最大重试次数
                    dragdrop: true,                   //开启可拖曳上传
                    drop_element: _containerId,        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                //分块上传时，每片的体积
                    auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    init: {
                        'FilesAdded': function (up, files) {
                            plupload.each(files, function (file) {
                                // 文件添加进队列后,处理相关的事情
                            });
                        },
                        /**
                         * @param up
                         * @param file
                         * @constructor
                         */
                        'BeforeUpload': function () {
                            // 每个文件上传前,处理相关的事情
                            /**
                             * 第一步检查是否到达上限
                             * 如超过limit的上限，则抛错
                             * @暂时不做
                             */

                            /**
                             * 第二，开始上传
                             */
                            scope.start();
                        },
                        /**
                         * @param up
                         * @param file
                         * @constructor
                         */
                        'UploadProgress': function () {
                            // 每个文件上传时,处理相关的事情
                        },
                        /**
                         * @param up
                         * @param file
                         * @param info
                         * @constructor
                         */
                        'FileUploaded': function (up, file, info) {
                            // 每个文件上传成功后,处理相关的事情
                            // 其中 info 是文件上传成功后，服务端返回的json，形式如
                            // {
                            //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                            //    "key": "gogopher.jpg"
                            //  }
                            // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                            // var domain = up.getOption('domain');
                            // var res = parseJSON(info);
                            // var sourceLink = domain + res.key; 获取上传成功后的文件的Url

                            /**
                             * JSONParse info
                             * 获取key，组合为链接地址 sourceLink
                             * 在ngModel中push新元素
                             */
                            var domain = up.getOption('domain');
                            var res = JSON.parse(info);
                            var sourceLink = domain + res.key; //获取上传成功后的文件的Url
                            console.log(file);
                            res.link = sourceLink;
                            res.name = file.name;
                            res.size = file.size;
                            res.type = file.type;
                            console.log(res);
                            scope.uploaderDatas.push(res);
                            scope.$digest();
                            //触发上传成功的回调
                            scope.success(file.name + '上传成功!');
                        },

                        /**
                         * @param up
                         * @param err
                         * @param errTip
                         * @constructor
                         */
                        'Error': function (up, err, errTip) {
                            //上传出错时,处理相关的事情
                            scope.error(errTip);
                            console.error(up, err, errTip);
                        },
                        'UploadComplete': function () {
                            //队列文件处理完毕后,处理相关的事情
                        },
                        /**
                         * @param up
                         * @param file
                         * @returns {Date}
                         * @constructor
                         */
                        'Key': function () {
                            // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                            // 该配置必须要在 unique_names: false , save_key: false 时才生效
                            /**
                             * 规则: objectid/timestamp/filename?randomAlphaNum
                             * 前面的保证是文件夹名
                             * @type {Date}
                             */

                            //var key = timestamp + '/' + file.name + '?' + generateRandomAlphaNum(10);
                            var key = generateRandomAlphaNum(10);

                            return key;
                        }
                    }
                });
            }
        }
    };
});
