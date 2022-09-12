import { defineStore } from 'pinia'
console.log();
export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        todos: [],
        carts: (localStorage.getItem("carts") != null) ? JSON.parse(localStorage.getItem("carts")) : []
    }),
    getters: {
        getAllTodos() {
            return this.todos
        },
        todoEmpty() {
            return this.todos.length <= 0
        },
        getAllCart() {
            return this.carts
        },
        getLengthItem() {
            return this.carts.length
        }
    },
    actions: {
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(index) {
            this.todos.splice(index, 1)
        },
        addCart(item) {
            this.carts.push(item)
        },
        editItemCart(index, item) {
            this.carts[index] = item
            return this.carts
        },
        removeCart(index) {
            this.carts.splice(index, 1)
        }

    },
})