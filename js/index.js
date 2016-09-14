        var timer,classes = ['center','left','back','right'];

        window.onload = function init(){
            mouseEvent();
            addEvent();
            timer = setInterval("changePosition(false)",3000);
        };

        var addEvent = function(){
            var leftPicture = getByClass('left'),rightPicture = getByClass('right'),
                centerPicture = getByClass('center');
            leftPicture.addEventListener('click',leftMove,false);
            rightPicture.addEventListener('click',rightMove,false);
            centerPicture.addEventListener('click',centerGrow,false);
        };

        var removeEvent = function(){
            var pictures = document.getElementsByTagName('li');
            pictures = [].slice.call(pictures);
            pictures.forEach(function(picture){
                picture.removeEventListener('click',leftMove);
                picture.removeEventListener('click',rightMove);
            });
        };

        var getByClass = function(className){
            var elements = document.getElementsByTagName('*'),result = [];
            elements = [].slice.call(elements);
            elements.forEach(function(element){
                if(element.classList.contains(className))
                    result.push(element);
            });
            if(result.length == 1){
                return result[0];
            }else{
                return result;
            };
            
        };

        var changePosition = function(flag){
            var stateClass = setStateClass(flag);
            var pictures = document.getElementsByTagName('li');
            removeEvent();
            for(var i=0;i<pictures.length;i++){
                pictures[i].classList.remove('center','left','back','right');
                pictures[i].classList.add(stateClass[i]);
            };
            addEvent();
        };

        var setStateClass = function(flag){
            var nowState = classes;
            if(flag === false){
                var firstItem = nowState.shift();
                nowState.push(firstItem);
                return nowState;
            }else if(flag === true){
                var lastItem = nowState.pop();
                nowState.unshift(lastItem);
                return nowState;
            }
            classes = nowState;  
        };

        var mouseEvent = function(){
            var wrap = getByClass('wrap');
            wrap.onmouseover = function(){
                clearInterval(timer);
            };
            wrap.onmouseout = function(){
                timer = setInterval("changePosition(false)",3000);
            };
        };

        var leftMove = function(){
            var centerPicture = getByClass('center');
            centerPicture.classList.remove('grow');
            changePosition(true);
        };

        var rightMove = function(){
            var centerPicture = getByClass('center');
            centerPicture.classList.remove('grow');
            changePosition(false);
        };

        var centerGrow = function(){
            var centerPicture = getByClass('center');
            centerPicture.classList.toggle('grow');
        };


        