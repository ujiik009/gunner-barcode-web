<template>
    <div class="body">
        <div id="content">
            <h1>Welcome!</h1>
            <form action="" method="get">
                <div class="input-bar">
                    <!-- <label for="name">username</label> -->
                    <input type="text" id="name" class="input" v-model="username">
                    <box-icon name='user'></box-icon>
                </div>
                <div class="input-bar">
                    <!-- <label for="password">password</label> -->
                    <input type="password" id="password" class="input" v-model="password">
                    <box-icon name='lock-alt'></box-icon>
                </div>
            </form>
            <button type="submit" id="btn">Login</button>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {
            username: "",
            password: ""
        }
    }
}
</script>
  
<style scoped>
* {
    margin: 0;
    padding: 0;
    outline: none;
}

.body {
    width: 100vw;
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

#content {
    min-width: 350px;
    padding: 50px;
    box-shadow: 0 11px 17px 5px rgb(0 0 0 / 33%);
    border-radius: 50px;
}

#content>h1 {
    text-align: center;
}

.input-bar {
    width: 350px;
    height: 60px;
    border: 2px solid #000;
    border-radius: 25px;
    margin: 30px 0;
    opacity: 0.5;
    transition: 200ms;
    font-weight: 600;
    position: relative;
}

.input-bar>label {
    position: absolute;
    font-size: 17px;
    text-transform: capitalize;
    top: 20px;
    left: 45px;
    transition: 200ms;
}

.input-bar>input {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    box-sizing: border-box;
    padding: 20px 45px 10px;
    font-size: 18px;
}

.input-bar>box-icon {
    position: absolute;
    width: 26px;
    top: 17px;
    left: 10px;
}

.focus {
    opacity: 1;
}

.focus>label {
    top: 2px;
    font-size: 12px;
}

#btn {
    width: 350px;
    border: none;
    padding: 15px;
    color: #fff;
    background-color: rgb(71, 71, 71);
    font-size: 24px;
    border-radius: 30px;
    cursor: pointer;
}

#btn:hover {
    background-color: rgb(48, 48, 48);
    ;
}
</style>