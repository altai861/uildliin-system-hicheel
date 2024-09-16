
while True:
    try:
        huudas = int(input("Хуудасны тоо: "))
        if huudas > 0:
            break  
        else:
            print("Та эерэг тоо оруулна уу.")
    except ValueError:
        print("Та тоо оруулна уу.")

while True:
    try:
        mor = int(input("Хуудасны мөр тоо: "))
        if mor > 0:
            break
        else:
            print("Та эерэг тоо оруулна уу.")
    except ValueError:
        print("Та тоо оруулна уу.")

while True:
    try:
        temdegt = int(input("Мөрийн тэмдэгтийн тоо: "))
        if temdegt > 0:
            break 
        else:
            print("Та эерэг тоо оруулна уу.")
    except ValueError:
        print("Та тоо оруулна уу.")

total = huudas * mor * temdegt

#register nu 1nanosec / 1 temdegt access time tai
registers = total * 10**-9

#cache ni 2 nanosec / 1 temdegt access time tai
cache = total * 2 * 10**-9

#ram ni 10 nanosec / 1 temdegt access time tai
ram = total * 10 * 10**-9

#disk ni 10 msec / 1024 temdegt access time tai
disk = total * 10 * 10**-3
disk = disk / 1024


def format_sec(size):
    # Define units and their corresponding factors
    units = [("gigaseconds", 10**9), ("megaseconds", 10**6), ("kiloseconds", 10**3), ("seconds", 1), ("milliseconds", 10**-3), ("microseconds", 10**-6), ("nanoseconds", 10**-9)]
    
    for unit, factor in units:
        if size >= factor or unit == "nanobytes":
            return f"{size / factor:.2f} {unit}"

print(f"Registers: {format_sec(registers)}")
print(f"Cache: {format_sec(cache)}")
print(f"Main memory: {format_sec(ram)}")
print(f"Magnetic Disk: {format_sec(disk)}")

