class Solution(object):
    def evalRPN(self, tokens):
        """
        :type tokens: List[str]
        :rtype: int
        """

        stack = []

        for token in tokens:
            if token in ['+', '-', '*', '/']:
                b = stack.pop()
                a = stack.pop()

                if token == '+':
                    stack.append(a + b)

                elif token == '-':
                    stack.append(a - b)

                elif token == '*':
                    stack.append(a * b)

                elif token == '/':
                    if a * b < 0 and a % b != 0:
                        stack.append(a // b + 1)
                    else:
                        stack.append(a // b)

            else:
                stack.append(int(token))

        return stack.pop()
