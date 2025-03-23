# **Algorithm Problems Completed**

## **Array and Hashing Problems Completed**

20 March 2025 Thursday

1. **Contains Duplicate**  
   - **Problem**: Determine if any value appears at least twice in the array.  
   - **Solution**: Used a set to track unique elements as we iterate through the array.

2. **Valid Anagram**  
   - **Problem**: Check if two strings are anagrams of each other.  
   - **Solution**: Utilized hash maps (dictionaries) to count character frequencies and compared them.

3. **Two Sum**  
   - **Problem**: Find two numbers in an array that add up to a specific target.  
   - **Solution**: Used a hash map to store previously seen numbers and check if the complement of the current number exists.

4. **Group Anagrams**  
   - **Problem**: Group anagrams together from a list of strings.  
   - **Solution**: Sorted each string and used a hash map to group words with identical sorted keys.

5. **Top K Frequent Elements**  
   - **Problem**: Return the k most frequent elements from a list.  
   - **Solution**: Used a hash map for counting frequencies and a heap (or sorting) to extract the top k elements.

6. **Encode and Decode Strings**  
   - **Problem**: Encode and decode a list of strings into a single string and back.  
   - **Solution**: Used a delimiter (like `#`) to concatenate strings for encoding and split by the delimiter for decoding.

7. **Product of Array Except Self**  
   - **Problem**: Return an array where each element is the product of all numbers in the input array except the current number.  
   - **Solution**: Used two passes (prefix and suffix) with arrays to avoid division, achieving an O(n) solution.

8. **Valid Sudoku**  
   - **Problem**: Check if a 9x9 Sudoku board is valid based on the rules for rows, columns, and subgrids.  
   - **Solution**: Utilized sets to track elements in each row, column, and 3x3 subgrid.

9. **Longest Consecutive Sequence**  
   - **Problem**: Find the length of the longest consecutive elements sequence.  
   - **Solution**: Used a hash set to track elements and iterated over the set, finding sequences efficiently in O(n) time.

## **Set Problems Completed**

21 March 2025 Friday

1. **Valid Parentheses**  
   - **Problem**: Check if a string containing parentheses is valid (closed in the correct order).  
   - **Solution**: Used a stack to track opening parentheses and match them with closing ones.

2. **Min Stack**  
   - **Problem**: Design a stack that supports push, pop, top, and retrieving the minimum element.  
   - **Solution**: Used a secondary stack to track the minimum elements at each stage.

3. **Evaluate Reverse Polish Notation**  
   - **Problem**: Evaluate a mathematical expression in Reverse Polish Notation.  
   - **Solution**: Used a stack to process operands and operators, calculating intermediate results.

4. **Generate Parentheses**  
   - **Problem**: Generate all combinations of well-formed parentheses for a given number of pairs.  
   - **Solution**: Applied backtracking, ensuring open and close counts never exceed the limit.

5. **Car Fleet**  
   - **Problem**: Determine how many car fleets will reach a target destination based on their starting positions and speeds.  
   - **Solution**: Used a stack to track times for each car to reach the target and group cars into fleets.

6. **Largest Rectangle in Histogram**  
   - **Problem**: Find the area of the largest rectangle that can be formed in a histogram.  
   - **Solution**: Used a stack to calculate the largest rectangle by processing bars from left to right, calculating width and height dynamically.

7. **Daily Temperatures**  
   - **Problem**: For each day, determine how many days you must wait until a warmer temperature.  
   - **Solution**: Used a stack to track the indices of temperatures, popping elements when a warmer temperature is found and calculating the number of days to wait.

## **Two Pointer Problems Completed**

22 March 2025 Saturday

1. **Valid Palindrome**  
   - **Problem**: Determine if a given string is a palindrome, considering only alphanumeric characters and ignoring case.  
   - **Solution**: Used two pointers, one starting from the beginning and one from the end, moving toward the center while ignoring non-alphanumeric characters and comparing characters case-insensitively.

2. **Two Sum II - Input Array is Sorted**  
   - **Problem**: Find two numbers such that they add up to a specific target from a sorted array.  
   - **Solution**: Applied the two-pointer approach to efficiently find the two numbers that sum up to the target by moving the pointers inward based on whether the current sum is less than or greater than the target.

3. **3Sum**  
   - **Problem**: Find all unique triplets in an array that sum to a target value.  
   - **Solution**: Used sorting and a two-pointer approach to find all unique triplets by iterating over each element and applying the two-pointer technique to find pairs that sum to the target minus the current element.

4. **Container with Most Water**  
   - **Problem**: Find the maximum area that can be contained between two lines in a 2D plane.  
   - **Solution**: Used the two-pointer approach to find the maximum area by calculating the area between the lines at the left and right pointers and then moving the pointer pointing to the shorter line toward the center to maximize the area.

5. **Trapping Rain Water**  
   - **Problem**: Calculate the amount of water that can be trapped between the bars in a given elevation map.  
   - **Solution**: Used a two-pointer approach to traverse the array, maintaining the maximum heights encountered from both sides, and calculated the trapped water based on the difference between the current height and the minimum of the two max heights.
