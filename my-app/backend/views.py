from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from io import StringIO

import pandas as pd
import warnings
warnings.filterwarnings("ignore")

@api_view(["POST"])
def upload_file(request):
    file = request.FILES.get("file")
    num_sensitivity = float(request.POST.get("num_sensitivity", 0.7))
    cat_sensitivity = float(request.POST.get("cat_sensitivity", 0.7))

    if not file:
        print("No file was uploaded.")
        return HttpResponse('No file was uploaded.', status=400)

    # Process the file (assuming it's a CSV)
    df = pd.read_csv(file)
    df = infer_and_convert_data_types(df, num_sensitivity, cat_sensitivity)
    print(df.head())

    res = df.to_json(orient='split')
    print('Response: ', res)

    return JsonResponse(res, safe=False)

def infer_and_convert_data_types(df, num_sensitivity=0.7, cat_sensitivity=0.7):
    temp_df = df.copy()
    
    for col in df.columns:
        # Skip columns with all NaN values
        if df[col].isnull().all():
            continue

        # Infer data type
        # Check if column is boolean
        if df[col].nunique() == 2 and df[col].dropna().isin([0, 1]).all():
            temp_df[col] = df[col].astype(bool)

        # Check if column is numeric
        if sum(pd.to_numeric(df[col], errors='coerce').notnull())/len(df) > num_sensitivity:
            temp_df[col] = pd.to_numeric(df[col], errors='coerce')

        # Check if column is datetime
        if pd.to_datetime(df[col], errors='coerce').notnull().all():
            temp_df[col] = pd.to_datetime(df[col], errors='coerce')

        # Check if the column should be categorical
        if len(df[col].unique()) / len(df[col]) < cat_sensitivity:  # Example threshold for categorization
            temp_df[col] = pd.Categorical(df[col])

        df[col] = temp_df[col]

    return df
