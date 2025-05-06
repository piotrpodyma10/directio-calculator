export const calculate = (expression: string): number => {
  const operators: Record<string, number> = {
    '+': 0,
    '-': 0,
    '*': 1,
    '/': 1,
  }

  const isOperator = (item: string) => ['+', '-', '*', '/'].includes(item)
  const isNumeric = (item: string) => /^-?\d+(\.\d+)?$/.test(item)

  const items = expression.match(/(\d+\.?\d*|\+|\-|\*|\/|\(|\))/g)
  if (!items) throw new Error('Invalid expression')

  const output: string[] = []
  const stack: string[] = []

  for (const item of items) {
    if (isNumeric(item)) {
      output.push(item)
    } else if (isOperator(item)) {
      while (
        stack.length &&
        isOperator(stack[stack.length - 1]) &&
        operators[item] <= operators[stack[stack.length - 1]]
      ) {
        output.push(stack.pop()!)
      }
      stack.push(item)
    } else if (item === '(') {
      stack.push(item)
    } else if (item === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop()!)
      }
      stack.pop()
    }
  }

  while (stack.length) {
    output.push(stack.pop()!)
  }

  const resultStack: number[] = []

  for (const item of output) {
    if (isNumeric(item)) {
      resultStack.push(Number(item))
    } else {
      const b = resultStack.pop()!
      const a = resultStack.pop()!
      switch (item) {
        case '+':
          resultStack.push(a + b)
          break
        case '-':
          resultStack.push(a - b)
          break
        case '*':
          resultStack.push(a * b)
          break
        case '/':
          resultStack.push(a / b)
          break
      }
    }
  }

  return resultStack[0]
}
