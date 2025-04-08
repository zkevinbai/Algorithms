class Solution(object):
    def evalRPN(self, tokens):
        """
        :type tokens: List[str]
        :rtype: int
        """

        stack = []

        for t in tokens:
            if t in ['+', '-', '*', '/']:
                b, a = stack.pop(), stack.pop()
                # keep in mind that the first pop is the second operand
                # print(a, b)

                if t == '+':
                    stack.append(a + b)
                elif t == '-':
                    stack.append(a - b)
                elif t == '*':
                    stack.append(a * b)
                elif t == '/':
                    stack.append(int(a / b))
            else:
                stack.append(int(t))


        return stack[0]
