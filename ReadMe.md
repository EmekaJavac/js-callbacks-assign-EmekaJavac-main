[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/53RxlSkg)
# Callback Chain

This project demonstrates how to chain multiple callbacks to process data in order using JavaScript. 

It is designed as a learning exercise to understand how callbacks can control execution order and to tell the difference between single vs multiple callbacks. 

---

## Project Structure
.
├── callbackChain.js 


## Instructions

1. Open **`callbackChain.js`**.
2. Create an initial object as a basis 
3. Implement the setTimeout() by iterating over each callback. Be sure to apply the callback to the result 
4. Export your functions at the bottom:

   ```js
   module.exports = { callbackChain };
   ```

5. Run the file using: 

    ```bash
    node callbackChain.js
    ```

6. Run the tests:

   ```bash
   npm test
   ```

7. If your implementation is correct:
   - All tests will pass 
   - You’ll see green output from Jest

