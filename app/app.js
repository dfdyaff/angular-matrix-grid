let App = angular.module('Task', ['ui.sortable'])

App.controller('appController', ($scope, $http) => {
    $scope.filteredTactics = 1

    $scope.setActive = category => {
        $scope.activeMenu = category
        $scope.filteredTactics = category.id
    }

    //sets shade level
    $scope.handleShade = (technique, count) => {
        technique.id = {...technique.id, ...{colorShade : count}}
        technique.id.clicked = count > 0 && count < 6;
        technique.id.colorShade = count % 6
    }

    $http.get('src/mitre.json').then((data) => {
        let startIndex = ''
        let finalIndex = ''
        $scope.searchQuery = ''
        $scope.categories = data.data.categories
        $scope.data = data.data.navigator
        $scope.activeMenu = $scope.categories[0]


        const sort = (arr, oldIndex, newIndex) => {
            if (newIndex >= arr.length) {
                let k = newIndex - arr.length + 1
                while (k--) {
                    arr.push(undefined)
                }
            }
            arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
            return arr
        }

        $scope.sortableOptions = {
            start: $event => {
                startIndex = [...$event.originalEvent.target.parentElement.children].indexOf($event.originalEvent.target)
            },
            update: $event => {
                //timeout to wait for other events
                setTimeout(() => {
                    finalIndex = [...$event.originalEvent.target.parentElement.children].indexOf($event.originalEvent.target)
                    $scope.data = sort(data.data.navigator, startIndex, finalIndex)

                    //trigger click to trigger sort
                    angular.element(document.querySelector('.active')).click()
                })
            }
        }
    })
})





