### **Array and Hashing Problems Completed**

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
