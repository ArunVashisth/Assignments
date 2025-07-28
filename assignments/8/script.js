document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Add task
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    function addTask() {
        const text = taskInput.value.trim();
        if (!text) return;
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `<span class="task-text">${escapeHTML(text)}</span><button class="delete-btn" title="Delete">&times;</button>`;
        taskList.appendChild(li);
        taskInput.value = '';
        taskInput.focus();
    }

    // Toggle complete or delete
    taskList.addEventListener('click', function(e) {
        if (e.target.classList.contains('task-text')) {
            e.target.classList.toggle('completed');
        } else if (e.target.classList.contains('delete-btn')) {
            e.target.parentElement.remove();
        }
    });

    // Prevent XSS
    function escapeHTML(str) {
        return str.replace(/[&<>"']/g, function(tag) {
            const chars = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            };
            return chars[tag] || tag;
        });
    }
});
