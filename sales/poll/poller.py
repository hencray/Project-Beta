import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something

from sales_rest.models import AutomobileVO

def get_automobiles():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    print('Response Status Code:', response.status_code)

    if response.status_code == 404:
        print("Error 404")

    content = json.loads(response.content)
    print('Response Content:', content)
    
    if "autos" in content:
        for automobile in content["autos"]:
            AutomobileVO.objects.update_or_create(
                vin = automobile["vin"],
                defaults = {"sold": automobile["sold"]} 
            )
    else:
        print("No autos")


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            get_automobiles()
        except Exception as e:
            print(e, file=sys.stderr)
        
        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
