committeeApp.controller("messagesCtrl", function ($scope, $location, userSrv, messagesSrv) {

    if (!userSrv.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.messages = [];
    let lastQuery = "";
    $scope.query = "";

    messagesSrv.getActiveUserMessages().then((messages) => {
        $scope.unread = 0;
        $scope.messages = messages;

    }).catch((err) => {
        $log.error(err);
    });

    $scope.queryFilter = function (message) {
        if ($scope.query != lastQuery) {
            lastQuery =  $scope.query;
            $scope.unread = 0;
        }

        if (!$scope.query) {
            isMessageUnread(message);
            return true;
        } else if (message.title.toLowerCase().includes($scope.query.toLowerCase()) ||
            message.details.toLowerCase().includes($scope.query.toLowerCase())) {
            isMessageUnread(message);
            return true;
        } else {
            return false;
        }
    }

    function isMessageUnread(message) {
        if (!message.wasRead)
            $scope.unread++;
    }

    $scope.onQueryChange = function () {
        $scope.unread = 0;
    }
    // $scope.getUnreadMessagesCount = () => {
    //     let unread = 0;
    //     $scope.messages.forEach(message => {
    //         if (!message.wasRead)
    //             unread++;
    //     });

    //     return unread;
    // };
})