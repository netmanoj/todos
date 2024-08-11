document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('todo-list');
    const input = document.getElementById('new-todo');
    const addButton = document.getElementById('add-btn');
    let items = JSON.parse(localStorage.getItem('items')) || [];

    function render() {
        list.innerHTML = '';
        items.forEach(item => {
            const el = document.createElement('div');
            el.className = 'todo-item';
            el.dataset.id = item.id;
            el.textContent = item.title;

            if (item.black) {
                el.classList.add('black');
            }

            el.addEventListener('click', () => {
                el.classList.toggle('black');
                item.black = el.classList.contains('black');
                save();
            });

            el.addEventListener('dblclick', () => {
                items = items.filter(i => i.id !== item.id);
                save();
                render();
            });

            list.appendChild(el);
        });
    }

    function save() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function addItem(title) {
        const newItem = {
            id: Date.now(),
            title: title,
            black: false
        };
        items.push(newItem);
        save();
        render();
    }

    addButton.addEventListener('click', () => {
        const title = input.value.trim();
        if (title) {
            addItem(title);
            input.value = ''; // Clear input field
        }
    });

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            items = data.slice(0, 10).map(item => ({
                ...item,
                black: false // Initialize black state
            }));
            render();
        });
});
