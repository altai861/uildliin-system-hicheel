# Input for rows (shugam) and columns (bagana)
while True:
    try:
        shugam = int(input("Шугамын тоо: "))
        if shugam > 0:
            break  # Exit the loop if a valid and positive number is entered
        else:
            print("Та эерэг тоо оруулна уу.")  # Prompt the user to enter a positive number again
    except ValueError:
        print("Та тоо оруулна уу.")  # Prompt the user to enter a number again

while True:
    try:
        bagana = int(input("Баганын тоо: "))
        if bagana > 0:
            break  # Exit the loop if a valid and positive number is entered
        else:
            print("Та эерэг тоо оруулна уу.")  # Prompt the user to enter a positive number again
    except ValueError:
        print("Та тоо оруулна уу.")  # Prompt the user to enter a number again

# Ask the user to choose the input method
while True:
    choice = input("Өнгөний тоог оруулах уу, эсвэл битийн тоог оруулах уу? (o/b): ").strip().lower()
    
    if choice == "o":
        while True:
            try:
                ongonii_too = int(input("Өнгөний тоо: "))
                if ongonii_too > 0:
                    # Calculate required bits
                    if (ongonii_too & (ongonii_too - 1)) == 0:
                        required_bits = ongonii_too.bit_length() - 1
                    else:
                        required_bits = ongonii_too.bit_length()
                    break
                else:
                    print("Та эерэг тоо оруулна уу.")  # Prompt the user to enter a positive number again
            except ValueError:
                print("Та тоо оруулна уу.")  # Prompt the user to enter a number again
        break
    
    elif choice == "b":
        while True:
            try:
                required_bits = int(input("Өнгөний битийн тоо: "))
                if required_bits > 0:
                    break  # Exit the loop if a valid and positive number is entered
                else:
                    print("Та эерэг тоо оруулна уу.")  # Prompt the user to enter a positive number again
            except ValueError:
                print("Та тоо оруулна уу.")  # Prompt the user to enter a number again
        break
    
    else:
        print("Та 'өнгө' эсвэл 'бит' гэж зөв бичнэ үү.")  # Prompt the user to enter a valid choice

# Calculate required bytes
res = shugam * bagana * required_bits / 8

# Format the result to the appropriate unit
def format_bytes(size):
    # Define units and their corresponding factors
    units = [("GB", 10**9), ("MB", 10**6), ("KB", 10**3), ("bytes", 1), ("millibytes", 10**-3), ("microbytes", 10**-6), ("nanobytes", 10**-9)]
    
    for unit, factor in units:
        if size >= factor or unit == "nanobytes":
            return f"{size / factor:.2f} {unit}"
    
formatted_res = format_bytes(res)
print(f"{formatted_res} хэрэгтэй")
