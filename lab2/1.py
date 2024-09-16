def find_permutations(arr):
    def backtrack(start):
        # If we've reached the end, we've found a permutation
        if start == len(arr):
            result.append(arr[:])  # Add a copy of the current permutation
        for i in range(start, len(arr)):
            # Swap the current element with the start element
            arr[start], arr[i] = arr[i], arr[start]
            # Recursively call to generate permutations from the next index
            backtrack(start + 1)
            # Backtrack: swap back to the original configuration
            arr[start], arr[i] = arr[i], arr[start]

    result = []
    backtrack(0)
    return result

n = int(input("N: "))
nums = []
for i in range(n):
    new = int(input(f'{i} num: '))
    nums.append(new)

permuts = find_permutations(nums)

print(permuts)

