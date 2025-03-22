class Solution(object):
    def carFleet(self, target, position, speed):
        """
        :type target: int
        :type position: List[int]
        :type speed: List[int]
        :rtype: int
        """
        # Step 1: Calculate the time to reach the target for each car
        # Step 2: Sort the cars by position in descending order (furthest first)
        cars = sorted(zip(position, speed), reverse=True)

        # Step 3: Use a stack to keep track of the time to reach the target for each fleet
        stack = []

        for pos, spd in cars:
            # Calculate the time for this car to reach the target
            time_to_target = (target - pos) / float(spd)

            # If the stack is empty or the current car is slower than the car at the top of the stack,
            # a new fleet is formed
            if not stack or time_to_target > stack[-1]:
                stack.append(time_to_target)

        # The size of the stack gives the number of fleets
        return len(stack)
