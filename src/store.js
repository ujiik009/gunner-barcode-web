import { defineStore } from 'pinia'
console.log();
export const useMainStore = defineStore({
    id: 'main',
    state: () => ({
        todos: [],
        carts: (localStorage.getItem("carts") != null) ? JSON.parse(localStorage.getItem("carts")) : [],
        user_id: "a7ce4fa7-8b7a-11ed-9a94-b42e99eb5887",
        order_select: {}
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
        selectOrder(order) {
            this.order_select = order
        },
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(index) {
            this.todos.splice(index, 1)
        },
        addCart(item) {
            console.log(item);
            var find_product_index = this.$state.carts.findIndex(x => x.id == item.id)

            if (find_product_index >= 0) {
                var current_item = this.$state.carts[find_product_index]
                console.log(current_item.qty, item.qty);
                current_item.qty = Number(item.qty) + Number(current_item.qty)


                this.carts[find_product_index] = current_item
            } else {
                this.carts.push(item)
            }

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