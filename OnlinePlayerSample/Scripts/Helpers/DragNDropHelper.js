// script based on tutorial from here - http://www.html5rocks.com/en/tutorials/dnd/basics/

$(document).ready(function () {

    if (Modernizr.canvas) {

        console.log('HTML5 & CSS 3 support - Ok!');

        //Add canvas code
        function handleDragStart(e) {
            // Target (this) element is the source node.
            this.style.opacity = '0.4';

            dragSrcEl = this;

            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', this.innerHTML);
        }

        var cols = document.querySelectorAll('.playlist_tiles .box');
        [].forEach.call(cols, function (col) {
            col.addEventListener('dragstart', handleDragStart, false);
        });
        
        function handleDragOver(e) {
            if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
            }

            e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

            return false;
        }

        function handleDragEnter(e) {
            // this / e.target is the current hover target.
            this.classList.add('over');
        }

        function handleDragLeave(e) {
            this.classList.remove('over');  // this / e.target is previous target element.
        }

        function handleDragEnd(e) {
            // this/e.target is the source node.

            [].forEach.call(cols, function (col) {
                col.classList.remove('over');
            });
        }
        
        var dragSrcEl = null;
        
        function handleDrop(e) {
            // this/e.target is current target element.

            if (e.stopPropagation) {
                e.stopPropagation(); // Stops some browsers from redirecting.
            }

            // Don't do anything if dropping the same box we're dragging.
            if (dragSrcEl != this) {
                // Set the source box's HTML to the HTML of the column we dropped on.
                dragSrcEl.innerHTML = this.innerHTML;
                this.innerHTML = e.dataTransfer.getData('text/html');
            }

            return false;
        }

        var cols = document.querySelectorAll('.playlist_tiles .box');
        [].forEach.call(cols, function (col) {
            col.addEventListener('dragstart', handleDragStart, false);
            col.addEventListener('dragenter', handleDragEnter, false);
            col.addEventListener('dragover', handleDragOver, false);
            col.addEventListener('dragleave', handleDragLeave, false);
            col.addEventListener('drop', handleDrop, false);
            col.addEventListener('dragend', handleDragEnd, false);
        });
        
    }
    if (Modernizr.localstorage) {
        //Add local storage code
        console.log("No HTML5 & CSS3 support => fallback to javascript!");
    }

});