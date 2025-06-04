
document.addEventListener('DOMContentLoaded', function() {
    // minimizar, maximizar e fechar janelas
    const windowControls = document.querySelectorAll('.window-controls .control');
    
    windowControls.forEach(control => {
        control.addEventListener('click', function() {
            const window = this.closest('.window');
            const windowContent = window.querySelector('.window-content');
            
            if (this.classList.contains('minimize')) {
                if (windowContent.style.display === 'none') {
                    windowContent.style.display = 'block';
                } else {
                    windowContent.style.display = 'none';
                }
            } else if (this.classList.contains('maximize')) {
                if (windowContent.style.maxHeight) {
                    windowContent.style.maxHeight = null;
                    window.style.width = null;
                } else {
                    windowContent.style.maxHeight = '500px';
                    windowContent.style.overflowY = 'auto';
                    window.style.width = '100%';
                }
            } else if (this.classList.contains('close')) {
                window.style.display = 'none';
            }
        });
    });
    
    const addTaskButton = document.querySelector('.add-task');
    const todoList = document.querySelector('.todo-list');
    
    if (addTaskButton && todoList) {
        addTaskButton.addEventListener('click', function() {
            const taskId = 'task' + (todoList.children.length + 1);
            const newTask = document.createElement('div');
            newTask.className = 'todo-item';
            newTask.innerHTML = `
                <input type="checkbox" id="${taskId}">
                <label for="${taskId}" contenteditable="true">Nova tarefa</label>
            `;
            todoList.appendChild(newTask);
            
            const newLabel = newTask.querySelector('label');
            newLabel.focus();

            const range = document.createRange();
            range.selectNodeContents(newLabel);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        });
    }

    const addFriendButton = document.querySelector('.add-friend');
    const friendsList = document.querySelector('.friends-list');
    
    if (addFriendButton && friendsList) {
        addFriendButton.addEventListener('click', function() {
            const newFriend = document.createElement('div');
            newFriend.className = 'friend-item';
            newFriend.innerHTML = `
                <div class="friend-pic">
                    <img src="https://placehold.co/40x40/ffb6c1/fff?text=♡" alt="novo amigo">
                </div>
                <div class="friend-info">
                    <div class="friend-name" contenteditable="true">novo amigo</div>
                    <div class="friend-status online">online</div>
                </div>
            `;

            friendsList.insertBefore(newFriend, addFriendButton);

            const newName = newFriend.querySelector('.friend-name');
            newName.focus();

            const range = document.createRange();
            range.selectNodeContents(newName);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

        });
    }

    const submitButton = document.querySelector('.submit-button');
    const guestbookEntries = document.querySelector('.guestbook-entries');
    const messageTextarea = document.querySelector('.guestbook-form textarea');
    
    if (submitButton && guestbookEntries && messageTextarea) {
        submitButton.addEventListener('click', function() {
            const message = messageTextarea.value.trim();
            
            if (message) {
                // obter data atual
                const now = new Date();
                const day = String(now.getDate()).padStart(2, '0');
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const year = now.getFullYear();
                const formattedDate = `${day}.${month}.${year}`;

                const newEntry = document.createElement('div');
                newEntry.className = 'guestbook-entry';
                newEntry.innerHTML = `
                    <div class="entry-avatar">
                        <img src="https://placehold.co/40x40/ffb6c1/fff?text=♡" alt="Avatar">
                    </div>
                    <div class="entry-content">
                        <div class="entry-info">
                            <span class="entry-author">Visitante</span>
                            <span class="entry-date">${formattedDate}</span>
                        </div>
                        <div class="entry-message">
                            ${message}
                        </div>
                    </div>
                `;

                guestbookEntries.insertBefore(newEntry, guestbookEntries.firstChild);
                
                messageTextarea.value = '';
            }
        });
    }

    const playButton = document.querySelector('.player-controls .player-button:nth-child(2)');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            if (this.textContent === '▶') {
                this.textContent = '❚❚';
            } else {
                this.textContent = '▶';
            }
        });
    }

    const monthButtons = document.querySelectorAll('.month-button');
    const currentMonth = document.querySelector('.current-month');
    
    if (monthButtons.length && currentMonth) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 
            'Maio', 'Junho', 'Julho', 'Agosto', 
            'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        
        let currentMonthIndex = months.indexOf('Maio');
        let currentYear = 2025;
        
        monthButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                if (index === 0) { // anterior
                    currentMonthIndex--;
                    if (currentMonthIndex < 0) {
                        currentMonthIndex = 11;
                        currentYear--;
                    }
                } else { // próximo
                    currentMonthIndex++;
                    if (currentMonthIndex > 11) {
                        currentMonthIndex = 0;
                        currentYear++;
                    }
                }
                
                currentMonth.textContent = `${months[currentMonthIndex]} ${currentYear}`;
            });
        });
    }
    
    
    imageContainers.forEach(container => {
        container.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {

                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                
                fileInput.addEventListener('change', function() {
                    if (this.files && this.files[0]) {
                        const reader = new FileReader();
                        
                        reader.onload = function(e) {
                            img.src = e.target.result;
                        };
                        
                        reader.readAsDataURL(this.files[0]);
                    }
                });
                
                fileInput.click();
            }
        });
    });
});
