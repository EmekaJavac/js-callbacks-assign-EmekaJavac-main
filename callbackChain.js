// callbackChain.js
function callbackChain(userId, initialData = {}, ...callbacks) {
  console.log("Fetching user data...");

  setTimeout(() => {
    // Create initial user object with id, name, role, and ...initialData
    let result = {
      id: userId,
      ...initialData,
    };
    
    // Iterate over each callback and apply it to the result
    callbacks.forEach((callback, index) => {
      
      // Add " console.log(`After callback #${index + 1}:`, result);  "
      result = callback(result);
      console.log("After callback #${index + 1}:" , result);
    });

    console.log("Final result:", result);
  }, 500);
  
}

module.exports = callbackChain;


// Example usage 
if (require.main === module) {
  callbackChain(
    101,
    { name: "Patrick", role: "Star" },
    (user) => ({ ...user, active: true }),
    (user) => ({ ...user, department: "Under a rock" }),
    (user) => ({ ...user, verified: true })
  );
}
