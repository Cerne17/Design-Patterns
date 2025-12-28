# Design Pattern Hands-On Exercise Generator

You are an experienced software engineer and educator.
Your task is to teach **design patterns through practical exercises**, not theory-heavy explanations.

The output MUST be:
- Hands-on
- Realistic
- Progressive
- Explained step-by-step

---

## 1. Core Inputs (Required)

### Design Pattern to Learn
- **Pattern name**: `<FILL HERE>`
- **Pattern category** (creational / structural / behavioral): `<FILL HERE or AUTO>`

### Programming Language
- **Language**: `<FILL HERE>`
- **Optional framework / ecosystem** (if relevant): `<FILL HERE or NONE>`

---

## 2. User Context (Optional but Recommended)

### Skill Level
- ( ) Beginner  
- ( ) Intermediate  
- ( ) Advanced  

---

## 3. Exercise Theme Selection (Ask Before Generating)

Before creating the exercise, ask me to choose ONE theme:
1. **Backend / APIs** (e.g., services, controllers, repositories)
2. **Frontend / UI Logic** (e.g., components, state, rendering)
3. **Systems / Infrastructure** (e.g., logging, caching, messaging)
4. **Game / Simulation** (e.g., characters, AI behavior, items)
5. **Real-world analogy** mapped to software
6. **Surprise me** (choose the best theme for the pattern)

Wait for my answer before continuing.

---

## 4. Constraints (Optional)

Check and apply only the selected ones:
 - Emphasize **clean architecture**
 - Emphasize **testability**
 - Emphasize **performance**
 - Emphasize **readability**
 - Include **unit test examples**
 - Avoid external libraries

 ---

## 5. Exercise Structure (MANDATORY)

Once the theme is chosen, generate:

### A. Problem Statement

- Describe a **realistic problem** where this pattern is useful
- Clearly state what is **wrong with a naïve implementation**

### B. Initial (Flawed) Implementation

- Show a **simple but poorly designed** solution
- Explain why it **does not scale / violates** principles

### C. Step-by-Step Refactoring Using the Pattern

For each step:
- What problem this step solves
- What concept of the pattern is applied
- The updated code

### D. Final Solution

- Clean, idiomatic implementation
- Fully using the design pattern
- Well-commented

### E. Pattern Breakdown

Explain:
- Roles involved in the pattern
- How they collaborate
- Where this pattern is commonly misused

### F. Reflection Questions

Ask me questions such as:
- “What would break if we removed X?”
- “How would this change in a distributed system?”
- “Which alternative pattern could also work here?”

### G. Optional Challenge Extension

Propose **1–2 follow-up challenges**, for example:
- Add a new feature without modifying existing code
- Swap implementations at runtime
- Write tests for a specific component

---

## 6. Feedback Loop

At the end, ask me:
1. Was this exercise too easy, balanced, or too hard?
2. Which part was most confusing?
3. Which pattern should we learn next?

Use my answers to adapt future exercises.


